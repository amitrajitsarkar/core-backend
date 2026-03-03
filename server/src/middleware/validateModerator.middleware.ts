import { Response, Request, NextFunction } from "express";
import * as E from "../utils/specificErrors"
// checks if the login user is admin or not if not --> not allowed
const validateModerator = (req:Request ,res:Response,next:NextFunction)=>{
    try{
        if(req.user)
        if(req.user.role === "moderator" || req.user.role === "admin"){  
            next(); 
        }else{
            throw new E.UnauthorizedError("Client is not moderator or admin");
        }
    }catch(err){
        next(err);
    }

}


export default validateModerator;