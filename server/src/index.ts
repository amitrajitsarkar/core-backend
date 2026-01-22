// import "dotenv/config";
import { env } from "./config/env";
import express from "express";
import cors from "cors";

import { connectDb } from "./config/dbconnection";

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Server is running" });
});

const bootstrap = async () : Promise<void> => {
  try {
    await connectDb();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log("Error while connecting ", err);
    process.exit(1);
  }
}

bootstrap();
