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
  })
  .strict();

export const env = envSchema.parse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
});
