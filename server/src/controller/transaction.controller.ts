import {NextFunction, Request,Response} from "express";
import TransactionService from "../service/transactions.service";
import ApiResponse from "../utils/ApiResponse";

import type { TransactionDataTypes } from "../@types/transaction";

const transactionService = new TransactionService();

class TransactionController {
    transaction = async(req:Request , res:Response , next:NextFunction) =>{
        try{
            const senderId = req.user?.id as string;
            const {recieverid} = req.body;
            const amount = Number(req.body.amount);

            const data:TransactionDataTypes ={
                senderId ,recieverid, amount
            }
            await transactionService.transaction(data as TransactionDataTypes);

            res.status(200).json(
                new ApiResponse(200,"Transaction successful " ,`${amount} is debitaded` ,true)
            )
        }catch(err){
            next(err);
        }
    }
 
}

export default TransactionController ;