import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;

    if (!url) {
      throw new Error("MongoDB connection URL is not found");
    }

    const conn = await mongoose.connect(url);

    console.log(
      `DB connected successfully. Hostname: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
