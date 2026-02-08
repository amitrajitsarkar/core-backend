import "dotenv/config";
import { z } from "zod";
const envSchema = z
  .object({
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    MONGO_URI: z.string().refine(
      (val) => {
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid url from MONGO_URI" },
    ),
    SALT: z.coerce.number().min(10).default(12),
    ACCESS_SECRET_KEY : z.string().min(64, "JWT secret must be at least 64 characters"),
    REFRESH_SECRET_KEY : z.string().min(64, "JWT secret must be at least 64 characters"),
  })
  .strict();

export const env = envSchema.parse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  SALT: process.env.SALT,
  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
});
