import { Response, Request, NextFunction } from "express";
import * as E from "../utils/specificErrors"
const validateAdmin = (req:Request ,res:Response,next:NextFunction)=>{
    try{
  
        if(req.user && req.user.role == "admin"){  
            next(); 
        }else{
            throw new E.UnauthorizedError("Client is not admin");
        }
    }catch(err){
        next(err);
    }

}


export default validateAdmin;