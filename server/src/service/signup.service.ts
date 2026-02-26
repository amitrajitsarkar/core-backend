import { env } from "../config/env";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel";
import type { CreateUserInputType } from "../schema/user.schema";
import type { loginSchemaType } from "../schema/login.schema";

import * as customErrors from "../utils/specificErrors"; // import as namespace
import { token } from "morgan";
import CreateToken from "../utils/createToken";

import TokenRepo from "../repository/token.repository";


class AuthService {
  private tokenRepo = new TokenRepo();
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
    if(!hashedPassword) throw new customErrors.BadRequestError("Not a general user may be logged in by OAuth service")
    const isPasswordValid = await bcrypt.compare(data.password, hashedPassword);
    if (!isPasswordValid) throw new customErrors.WrongCredential("Invalid credentials");
    

    const accessToken = this.createToken.createAccessToken(User);
    const refreshToken = this.createToken.createRefreshToken(User);

    await this.tokenRepo.storeRefreshToken(User,refreshToken);

    return {
      username: User.username,
      accessToken,
      refreshToken,
      role:User.role
    };
  }

  

  private sendAccessToken(){
    // create the tokern sending via cookie
    
  }
}

export default AuthService;


