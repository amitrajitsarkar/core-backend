import { Response, Request, NextFunction } from "express";
import * as E from "../utils/specificErrors"
// checks if the login user is admin or not if not --> not allowed
const validateAdmin = (req:Request ,res:Response,next:NextFunction)=>{
    try{
        // FIXME:  the role is not there int the User :-.
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