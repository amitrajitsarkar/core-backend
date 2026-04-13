// structure of the general transaction to remove the repeating try catch boilerplate
import mongoose from "mongoose";

const transactionStructure = async(fn:(session : mongoose.ClientSession) => Promise<void>)=>{
    const session  = await mongoose.startSession();
    try{
        session.startTransaction();
        //mian task area --> fn in my case 
        await fn(session);
        await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
        throw err ;
    }finally{
        session.endSession();
    }
}

export default transactionStructure;