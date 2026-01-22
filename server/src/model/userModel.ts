import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
  },
});

UserSchema.index({ createdAt: -1 });
export const userModel = mongoose.model("user", UserSchema);
