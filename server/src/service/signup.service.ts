import { env } from "../config/env";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel";
import type { CreateUserInput } from "../schema/user.schema";

class AuthService {
  async signup(data: CreateUserInput) {
    if (await userModel.exists({ username: data.username })) {
      throw new Error("Username already exist");
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

  async login(data:CreateUserInput){
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
