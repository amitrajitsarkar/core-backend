import {Response,Request} from "express";
import protectedService from "../service/protected.service";
import * as E from "../utils/specificErrors"
import ApiResponse from "../utils/ApiResponse";

class Protected{    
    private privateLogic = new protectedService();
    protectedController = (_:Request, res:Response)=>{
        const data = this.privateLogic.protected();
        res.status(200).json(
         new ApiResponse(200,"Successfully authenticated",data,true)
        )
    
    } 

    refreshController =  async(req:Request,res:Response) =>{
        try{

            const newAccessToken = await this.privateLogic.refresh(req.cookies.refreshToken);
            res.cookie('accessToken' , newAccessToken ,{
                httpOnly:true,
                secure: false, //  only for dev env. 
                sameSite: 'strict' ,
                maxAge: 15*1000, 
            })  
            res.status(200).json(
                new ApiResponse(200,"Access token refreshed",null,true)
            )
        }catch(err){
            throw new E.UnauthorizedError();
        }
    }
}

export default Protected;