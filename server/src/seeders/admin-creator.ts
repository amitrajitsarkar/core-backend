import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { env } from "../config/env";
import { userModel } from "../model/userModel";
import { logger } from "../utils/logger";
const MONGO_URI = env.MONGO_URI;

async function seedAdmin() {
  await mongoose.connect(MONGO_URI);
  if (env.NODE_ENV === "production") {
    throw new Error("Warning : Seeding disabled in production");
  }

  const username = env.ADMIN_USERNAME 
  const email = env.ADMIN_EMAIL
  const password = env.ADMIN_PASSWORD ;


  const existing = await userModel.findOne({ email });
  if (existing) {
    logger.warn("Admin already exists");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await userModel.create({
    username,
    email,
    password:passwordHash,
    role: "admin"
  });

  logger.info("Admin user created");
  process.exit(0);
}

seedAdmin().catch(err => {
  logger.error(err);
  process.exit(1);
});



