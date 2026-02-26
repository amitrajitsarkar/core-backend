import { Request,Response,NextFunction } from "express";
import * as E from "../utils/specificErrors";
import { RequestUser } from "../@types/requestUser";
import { userModel } from "../model/userModel";

// sets the 
const setReqHeader = async(req:Request,res:Response,next:NextFunction)=>{
    
    try{
        const {userAdmin}  = req.body as {userAdmin : string};
        if(!userAdmin) throw new E.BadRequestError("username of Admin is required");
        
        const user = await userModel.findOne({username:userAdmin}) as RequestUser;
        if(!user) throw new E.BadRequestError("user is not Admin");

        if (!user.role || !user.username || !user.email) {
            throw new E.BadRequestError("User data incomplete");
        }

        req.user={
            id:user.id?.toString(),
            role:user.role ,
            username: user.username,
            email: user.email,
        } 
        next();
    }catch (error) {
        next(error);
    }
}

export default setReqHeader;