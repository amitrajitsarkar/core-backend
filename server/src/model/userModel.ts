import mongoose from "mongoose";



const { Schema } = mongoose;

const UserSchema = new Schema({
      username: {
        type: String,
        required: false, // for the OAuth users
        sparse:true,
      },
      resetToken:{
        type:String,
        required : false
      },
      resetTokenExpiry :{
        type:Date,
        required : false
      },
      name:{
        type:String,
        unique:false
      },
      email: {
        type: String,
        unique:true,
        sparse:true
      },
      password: {
        type: String,
        required: false, // for the OAuth users
      },
      provider:{
        type:String,
        enum:["google" , "github" , null], // null fot the local users
        default:null,
      },
      providerId:{
        type:String,
        default:null ,
        
      },
      createdAt: {
        type: Date,
        default:Date.now,
      },
      role: {
        type: String,
        enum: ["user" ,"developer" ,"moderator" ,"admin"],
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
UserSchema.index({ provider: 1, providerId: 1 }, { unique: true, sparse: true });
export const userModel = mongoose.model("user", UserSchema);
