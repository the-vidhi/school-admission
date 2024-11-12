import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("\u001b[1;36m", "Connected to the database ...");
  } catch (error) {
    console.log("\u001b[1;31m", "Error while connecting to the database ...", error);
  }
};
