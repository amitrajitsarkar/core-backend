// import "dotenv/config";
import { env } from "./config/env";
import express from "express";
import cors from "cors";
import morgan from "morgan"

import { connectDb } from "./config/dbconnection";

import signupRouter from "./routes/signup.routes";
import loginRouter from "./routes/login.routes"

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.json({ message: "Server is running" });
});

app.use(signupRouter);
app.use(loginRouter)

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
