import "dotenv/config";
import { z } from "zod";
const envSchema = z
  .object({
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  })
  .strict();

export const env = envSchema.parse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
});
