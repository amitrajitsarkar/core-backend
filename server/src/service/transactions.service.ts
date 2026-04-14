import { env } from '../config/env';
import mongoose from 'mongoose';
import { userModel } from '../model/userModel';
import transactionStructure from '../utils/transactions.utils';
import { TransactionLimitError } from '../utils/specificErrors';

import type { TransactionDataTypes } from '../@types/transaction';

class TransactionService {
    public transaction = async (data: TransactionDataTypes) => {
        try {
            if(data.amount>env.MAX_TRANSFER_LIMIT){
                throw new TransactionLimitError(); // failed transactions will also increase the limiting counter
            }
            const transaactionFunction = async (
                session: mongoose.ClientSession,
            ): Promise<void> => {
                // deduction from the sender
                await userModel.findByIdAndUpdate(
                    data.senderId,
                    { $inc: { balance: -data.amount } },
                    { session },
                );
                // add into the recievers wallet
                await userModel.findByIdAndUpdate(
                    data.recieverid,
                    { $inc: { balance: data.amount } },
                    { session },
                );
            };
            transactionStructure(transaactionFunction);
        } catch (err) {
            throw err;
        }
    };
}

export default TransactionService;
