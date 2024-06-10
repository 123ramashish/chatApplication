import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/");
    console.log("Database Connected!");
  } catch (err) {
    console.log("Error occur while connect to DB");
  }
};
