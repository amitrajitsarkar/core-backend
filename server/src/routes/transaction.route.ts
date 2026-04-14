import { Router } from 'express';
import TransactionController from '../controller/transaction.controller';
import jwtHandler from '../middleware/jwtHandler.middleware';
import { createtransactionRateLimit } from '../middleware/transactionRateLimit.middleware';

import { RateLimitRequestHandler } from 'express-rate-limit';

let rateLimiter: RateLimitRequestHandler;
const getTransactionRateLimit = () => {
    if (!rateLimiter) {
        rateLimiter = createtransactionRateLimit();
    }
    return rateLimiter;
};

const transaction = new TransactionController();
const transactionRouter = Router();

transactionRouter.post(
    '/transactions',
    jwtHandler,
    (req,res,next) => getTransactionRateLimit()(req,res,next),
    transaction.transaction,
);

export default transactionRouter;
