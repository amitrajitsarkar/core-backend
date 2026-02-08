import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
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
    enum: ["user", "admin"],
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
