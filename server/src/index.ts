// import "dotenv/config";
import { env } from "./config/env";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/dbconnection";

import "./infra/passport"
import passport from "passport";

import errorHandler from "./middleware/errorHandler.middlewares";

import signupRouter from "./routes/signup.routes";
import loginRouter from "./routes/login.routes";
import deleteUserRouter from "./routes/deleteUser.routes";
import protectedRoutes from "./routes/protected.routes";
import promote from "./routes/promote.routes";
import OAuthGoogleRouter from "./routes/OAuth.routes";

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());

app.get("/health", (_, res) => {
  res.json({ message: "Server is running" });
});

app.use(signupRouter);
app.use(loginRouter);
app.use(deleteUserRouter);
app.use(protectedRoutes);
app.use("/admin",promote);
app.use("/v1/OAuth2",OAuthGoogleRouter);



const bootstrap = async (): Promise<void> => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Error while connecting ", err);
    process.exit(1);
  }
};

bootstrap();

app.use(errorHandler);
