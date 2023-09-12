import mongoose, { ConnectOptions } from "mongoose";
import "dotenv/config";

// MongoDB server url
const uri: any = process.env.CONNECTION_URL;

// Connect to database
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
