import "dotenv/config";
import { CLIENT_RENEG_LIMIT } from "node:tls";
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
    ADMIN_USERNAME: z.string().min(2),
    ADMIN_PASSWORD:z.string()
    .regex(/[A-Z]/,"should have one upperCase")
    .regex(/[a-z]/,"should have one lower case")
    .regex(/[!@#$%&]/, "Must have a special character")
    .refine((pwd) => {
      const match = (pwd.match(/[0-9]/g) || []).length;

      // if(match >=2) return true ;
      // return false ;  or simply

      return match >= 2;
    }, "Must have 2 numbers"),
    ADMIN_EMAIL:z.email(),
    GOOGLE_CLIENT_ID:z.string(),
    GOOGLE_CLIENT_SECRET:z.string(),
    GITHUB_CLIENT_ID:z.string(),
    GITHUB_CLIENT_SECRET:z.string(),

    EMAIL_USER : z.email(),
    EMAIL_PASS : z.string().length(16),
    CLIENT_URL: z.url(),

  })
  .strict();

export const env = envSchema.parse({
  PORT: process.env.PORT,

  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  SALT: process.env.SALT,

  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,

  ADMIN_USERNAME:process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD:process.env.ADMIN_PASSWORD,
  ADMIN_EMAIL:process.env.ADMIN_EMAIL,

  GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,

  GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET,

  EMAIL_USER : process.env.EMAIL_USER,
  EMAIL_PASS : process.env.EMAIL_PASS,
  CLIENT_URL : process.env.CLIENT_URL,
});
