import crypto from "node:crypto"
import { refresh_tokenModel } from "../model/refresh_token";

import { UserTypes } from "../@types/UserFromDb";


class TokenRepo {
    public storeRefreshToken = async (User : UserTypes , refreshToken:string) =>{
    const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;
    const expiresin  = Date.now() + REFRESH_TTL_MS ;
    const hashdRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
    
    await refresh_tokenModel.findOneAndDelete({ userId: User._id });

    await refresh_tokenModel.create({
      userId:User._id,
      username:User.username ?? null, 
      createdAt : Date.now() ,
      expiresAt : new Date(expiresin),
      refresh_token : hashdRefreshToken
    })
  }
}

export default TokenRepo;