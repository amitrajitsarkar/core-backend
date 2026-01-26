import { env } from "../config/env";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel";
import type { CreateUserInputType } from "../schema/user.schema";
import type { loginSchemaType } from "../schema/login.schema";
import {conflictError} from "../utils/specificErrors";

class AuthService {
  async signup(data: CreateUserInputType) {
    if (await userModel.exists({ username: data.username })) {
      throw new conflictError();
    }

    const SALT: number = env.SALT;
    if (!SALT) {
      throw new Error("Invalid SALT configuration");
    }

    const hashed = await bcrypt.hash(data.password, SALT);

    const user = await userModel.create({
      username: data.username,
      password: hashed,
      createdAt: Date.now(),
    });

    return {
      id: user._id,
      username: user.username,
    };
  }

  async login(data:loginSchemaType){
    const User  = await userModel.findOne({username:data.username});
    if(!User) throw new Error("Username doesn't exist !") ;

    const hashedPassword = User.password ;
    const user = await bcrypt.compare(data.password , hashedPassword);
    if(!user) throw new Error("Wrong Password") ;

    return {
      username : User.username,
    }
  }
}

export default AuthService;
