import { Router } from "express";
import TransactionController from "../controller/transaction.controller";
import jwtHandler from "../middleware/jwtHandler.middleware";

const transaction = new TransactionController();
const transactionRouter = Router();

transactionRouter.post("/transactions" ,jwtHandler,transaction.transaction);

export default transactionRouter ;