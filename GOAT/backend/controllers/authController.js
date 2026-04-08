import jwt from "jsonwebtoken";
import axios from "axios";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email && !phone)
      return res.status(400).json({ message: "Email or phone is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const existing = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : []),
      ],
    });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, phone, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (!email && !phone)
      return res.status(400).json({ message: "Email or phone is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const query = email ? { email } : { phone };
    const user = await User.findOne(query).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/logout
export const logout = (_req, res) => {
  res.json({ message: "Logged out successfully" });
};

// In-memory OTP store (works for single server; fine for this project)
const otpStore = new Map(); // phone -> { otp, expiresAt }

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "No account found with this phone number" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

    // Send OTP via Fast2SMS
    try {
      await axios.get("https://www.fast2sms.com/dev/bulkV2", {
        params: {
          authorization: process.env.FAST2SMS_API_KEY,
          message: `Your OTP for Adarsh Mutton Shop password reset is: ${otp}. Valid for 10 minutes.`,
          language: "english",
          route: "q",
          numbers: phone,
        },
      });
    } catch (smsErr) {
      console.error("SMS send failed:", smsErr.message);
      // Still log OTP as fallback
      console.log(`OTP for ${phone}: ${otp}`);
    }

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { phone, otp, newPassword } = req.body;
    if (!phone || !otp || !newPassword)
      return res.status(400).json({ message: "Phone, OTP and new password are required" });

    const record = otpStore.get(phone);
    if (!record) return res.status(400).json({ message: "OTP not requested or expired" });
    if (Date.now() > record.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ message: "OTP expired. Please request again" });
    }
    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();
    otpStore.delete(phone);

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
