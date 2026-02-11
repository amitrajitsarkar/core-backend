import { env } from "../config/env";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel";
import type { CreateUserInputType } from "../schema/user.schema";
import type { loginSchemaType } from "../schema/login.schema";
import type { UserTypes } from "../@types/UserFromDb";
import * as customErrors from "../utils/specificErrors"; // import as namespace
import { token } from "morgan";
import CreateToken from "../utils/createToken";
import crypto from "node:crypto";
import { refresh_tokenModel } from "../model/refresh_token";


class AuthService {
  private createToken = new CreateToken();
  async signup(data: CreateUserInputType) {
    if (await userModel.exists({ username: data.username })) {
      throw new customErrors.conflictError();
    }

    const SALT: number = env.SALT;
      
    if (!SALT) {
      throw new customErrors.SaltError();
    }

    const hashed = await bcrypt.hash(data.password, SALT);

    const user = await userModel.create({
      username: data.username,
      password: hashed,
      email:data.email,
      createdAt: Date.now(),
      role: "user",
    });

    return {
      id: user._id,
      username: user.username,
    };
  }

  async login(data: loginSchemaType) {
    

    const User = await userModel.findOne({ username: data.username });
    if (!User) throw new customErrors.NotFoundError();
    
    const hashedPassword = User.password;
    const user = await bcrypt.compare(data.password, hashedPassword);
    if (!user) throw new customErrors.WrongCredential();
    

    const accessToken = this.createToken.createAccessToken(User);
    const refreshToken = this.createToken.createRefreshToken(User);

    await this.storeRefreshToken(User,refreshToken) ;

    return {
      username: User.username,
      accessToken,
      refreshToken,
      role:User.role
    };
  }

  private async storeRefreshToken(User : UserTypes , refreshToken:string){
    const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;
    const expiresin  = Date.now() + REFRESH_TTL_MS ;
    const hashdRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const refreshTokenExists = await refresh_tokenModel.findOne({userId:User._id});
    if(refreshTokenExists){
      await refresh_tokenModel.deleteOne({userId:User._id});
    }
    await refresh_tokenModel.create({
      userId:User._id,
      createdAt : Date.now() ,
      expiresAt : new Date(expiresin),
      refresh_token : hashdRefreshToken
    })
  }

  private sendAccessToken(){
    // create the tokern sending via cookie
    
  }
}

export default AuthService;


