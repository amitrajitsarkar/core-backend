import crypto from "node:crypto"
import { refresh_tokenModel } from "../model/refresh_token";
export interface RepoObject {
  id : string;
  username? : string;
}

import { UserTypes } from "../@types/UserFromDb";


class TokenRepo {  
    public storeRefreshToken = async ( {id , username} : RepoObject , refreshToken:string) =>{
    const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;
    const expiresin  = Date.now() + REFRESH_TTL_MS ;
    const hashdRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
    
    await refresh_tokenModel.findOneAndDelete({ _id : id });

    await refresh_tokenModel.create({
      userId:id,
      username:username ?? null, 
      createdAt : Date.now() ,
      expiresAt : new Date(expiresin),
      refresh_token : hashdRefreshToken
    })
  }
}

export default TokenRepo;
