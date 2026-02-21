import { Request,Response,NextFunction } from "express";
import * as E from "../utils/specificErrors"
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { reqUserPayload } from "../@types/jwt";

const jwtHandler = (req:Request,res:Response,next:NextFunction)=>{
    const {accessToken} = req.cookies; 

    if(!accessToken){
        throw new E.UnauthorizedToken();
    }

    try{
        const decoded = jwt.verify(accessToken,env.ACCESS_SECRET_KEY) as reqUserPayload;
    
        req.user=decoded; 
        next();
    }catch (error) {
        if (error instanceof Error && error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(403).json({ error: 'Invalid token' });
    }
}

export default jwtHandler;