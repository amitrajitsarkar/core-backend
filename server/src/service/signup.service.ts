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
}

export default AuthService;
