import mongoose from "mongoose";
import { email } from "zod";

const { Schema } = mongoose;

const UserSchema = new Schema({
      username: {
        type: String,
        required: true,
        unique:true,
      },
      email: {
        type: String,
        required: true,
        unique:true,
      },
      password: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
      },
      role: {
        type: String,
        enum: ["user","developer", "admin"],
        default: "user"
      },
      refreshToken :{
        type : String,
      },
      expiresIn :{
        type : Date,
      }
});

UserSchema.index({ createdAt: -1 });
export const userModel = mongoose.model("user", UserSchema);
