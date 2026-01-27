import { Request,Response,NextFunction } from "express";
import ApiResponse from "../utils/ApiResponse";
import AppError from "../utils/AppError";


const errorHandler = (err:any , req:Request, res:Response ,next : NextFunction)=>{
    // all the custom errors are inherited from AppError 
    if(err instanceof AppError){
        return res.status(err.statusCode).json(
            new ApiResponse(err.statusCode,err.message,null,false)
        );
    }else if(err instanceof Error){
        return res.status(500).json(
            new ApiResponse(500,err.message,null,false)
        );
    }
    // Extra fallback 
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", null, false)
        );
}

export default errorHandler ;