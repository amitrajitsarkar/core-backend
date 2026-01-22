import mongoose from "mongoose";
import { env } from "./env";
const URI = env.MONGO_URI;

export const connectDb = async() : Promise<void>=>{
  try {
    if (!URI) throw new Error("The Mongo Uri doesn't exist");
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (err) {
    if (err instanceof Error) {
    console.log("Error while connecting to the DB " + err.message);
    }
  }
}
