import mongoose from "mongoose";

const connectDB = async () => {
  // mongoose.connect(process.env.MONGO_URI)
  // .then(() => console.log("MongoDB Atlas connected"))
  // .catch((err) => console.error(err));

 try {
    console.log("Mongo URI:", process.env.MONGO_URL); // DEBUG LINE

    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");
    console.log("Connected DB:", mongoose.connection.name);

  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }


  // try {
  //   await mongoose.connect("mongodb://127.0.0.1:27017/muttonshop");
  //   console.log("MongoDB Connected Successfully to database ", mongoose.connection.name);
  // } catch (error) {
  //   console.log("MongoDB Connection Failed", error);
  //   process.exit(1);
  // }
};

export default connectDB;
