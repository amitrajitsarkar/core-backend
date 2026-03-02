import * as E from "../utils/specificErrors"
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import crypto from "crypto";
import { refresh_tokenModel } from "../model/refresh_token";
import { reqUserPayload } from "../@types/jwt";
class protectedService{
    protected = ():string =>{
        return "Protected route is available";
    }
    
    refresh = async(refreshToken:string) =>{
        if(!refreshToken){
            throw new E.UnauthorizedError();
        }  
        try{
            const decoded = jwt.verify(refreshToken,env.REFRESH_SECRET_KEY) ;
            const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

            const refreshTokenExixsts = await refresh_tokenModel.findOne({refresh_token:hashedToken});
            if(!refreshTokenExixsts){
                throw new E.UnauthorizedToken('Invalid refresh token');
            }
            const newAccessToken = jwt.sign(
                { userId: refreshTokenExixsts._id },
                env.ACCESS_SECRET_KEY,
                { expiresIn: '15s' }
            );

            return newAccessToken;
        }catch(err){
            throw new E.UnauthorizedToken('Invalid refresh token');
        }
    }
}   

export default protectedService ;