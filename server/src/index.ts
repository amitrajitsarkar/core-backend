// import "dotenv/config";
import { env } from "./config/env";
import express from "express";
import cors from "cors";

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
