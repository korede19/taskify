import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const connectMongoDB = async () => {
  try {
    // Check if we have an existing connection
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    // If not connected, establish a new connection
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log("MongoDB connected successfully");
    return conn.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);

    // Optionally, you could throw the error or handle it differently
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectMongoDB;
