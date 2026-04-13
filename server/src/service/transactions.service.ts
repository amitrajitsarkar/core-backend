import mongoose from "mongoose";
import { userModel } from "../model/userModel";
import transactionStructure from "../utils/transactions.utils";

import type { TransactionDataTypes } from "../@types/transaction";

class Transactions{
    
    public transaction = async(data : TransactionDataTypes)=>{
        const transaactionFunction = async(session:mongoose.ClientSession):Promise<void> =>{
        // deduction from the sender
        await userModel.findByIdAndUpdate(
            data.senderId,
            { $inc : {balance : -data.amount}},
            {session}
        )
        // add into the recievers wallet
        await userModel.findByIdAndUpdate(
            data.recieverid,
            { $inc : {balance : data.amount}},
            {session}
        )
    }
        transactionStructure(transaactionFunction);
    }
}


export default Transactions;