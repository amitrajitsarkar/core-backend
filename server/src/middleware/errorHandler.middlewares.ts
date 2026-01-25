import { Request,Response,NextFunction } from "express";
import conflictError from "../utils/AppError";
import ApiResponse from "../utils/ApiResponse";
const errorHandler = (err:any , req:Request, res:Response ,next : NextFunction)=>{
    if(err instanceof conflictError){
        return res.status(err.statusCode).json(
            new ApiResponse(err.statusCode,err.message,null,false)
        );

    }
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", null, false)
        );
}