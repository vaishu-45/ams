const BASE_URL = import.meta.env.VITE_API_URL || "https://ams-6oyz.onrender.com/api";

// Store/retrieve token from localStorage
export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");

export const getUser = () => {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
export const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const removeUser = () => localStorage.removeItem("user");

// Generic fetch wrapper
const request = async (path, options = {}) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// Auth
export const registerUser = (body) =>
  request("/auth/register", { method: "POST", body: JSON.stringify(body) });

export const loginUser = (body) =>
  request("/auth/login", { method: "POST", body: JSON.stringify(body) });

export const logoutUser = () =>
  request("/auth/logout", { method: "POST" });

// User
export const fetchProfile = () => request("/users/profile");
export const updateProfile = (body) =>
  request("/users/profile", { method: "PUT", body: JSON.stringify(body) });

// Orders
export const placeOrder = (body) =>
  request("/orders", { method: "POST", body: JSON.stringify(body) });

export const fetchMyOrders = () => request("/orders/my");
