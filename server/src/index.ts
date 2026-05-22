import { env } from "./config/env";
import pinoHttp from "pino-http";
import {logger}  from "./utils/logger";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/dbconnection";
import { connectRedis } from "./config/redisConnection";

import "./infra/passport"
import passport from "passport";

import errorHandler from "./middleware/errorHandler.middlewares";

import router from "./routes/index.route";
import { createtransactionRateLimit } from "./middleware/transactionRateLimit.middleware";

import { RateLimitRequestHandler } from "express-rate-limit";

const app = express();
const PORT = Number(process.env.PORT)|| 5000;
const httpLogger = pinoHttp({logger});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(httpLogger);


app.get("/health", (_, res) => {
  res.json({ message: "Server is running" });
});



const bootstrap = async (): Promise<void> => {
  try {
    logger.info("Starting server...");
    
    logger.info("Connecting to database...");

    await connectDb();
    logger.info("Database connected successfully");

    logger.info("Connecting to Redis...");

    // await connectRedis();
    logger.info("Redis connected successfully");

    app.use(router);
    app.use(errorHandler);

    app.listen(PORT,"0.0.0.0", () => {
      logger.info(`Server is running on port ${PORT}`);
      
    }); 
  } catch (err) {
    logger.error({err} ,"Error while connecting ");
    process.exit(1);
  }
};

bootstrap().catch((err) => {
  logger.error(err, "Unhandled error in bootstrap");
  process.exit(1);
});

