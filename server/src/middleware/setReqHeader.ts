import { Request,Response,NextFunction } from "express";
import * as E from "../utils/specificErrors"
import { reqUserPayload } from "../@types/jwt";
import { userModel } from "../model/userModel";

// sets the 
const setReqHeader = async(req:Request,res:Response,next:NextFunction)=>{
    
    try{
        const {username}  = req.body as {username : string};
        if(!username) throw new E.BadRequestError("username is required");
        
        const user = await userModel.findOne({username}) as reqUserPayload;
    
        req.user=user;
        next();
    }catch (error) {
        next(error);
    }
}

export default setReqHeader;