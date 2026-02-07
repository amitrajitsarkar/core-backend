import { env } from "../config/env";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel";
import type { CreateUserInputType } from "../schema/user.schema";
import type { loginSchemaType } from "../schema/login.schema";
import * as customErrors from "../utils/specificErrors"; // import as namespace

class AuthService {
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
      createdAt: Date.now(),
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

    return {
      username: User.username,
    };
  }
}

export default AuthService;
