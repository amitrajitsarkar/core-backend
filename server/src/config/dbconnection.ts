import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";
const URI = env.MONGO_URI;

export const connectDb = async() : Promise<void>=>{
  try {
    if (!URI) throw new Error("The Mongo Uri doesn't exist");
    await mongoose.connect(URI);
    logger.info("MongoDB is connected");
  } catch (err) {
    logger.error({err} ,"Error while connecting to the DB ");
    process.exit(1);    
  }
}
