import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    // Remove debug mode in production for better performance
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }

    const connectInstance = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection optimization options
      maxPoolSize: 10, // Maximum number of connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Database connected successfully: ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
