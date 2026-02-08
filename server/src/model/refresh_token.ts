import mongoose from "mongoose";
import strict from "node:assert/strict";

const {Schema} = mongoose;

const tokenSchema = new Schema({
    id:String,
    refresh_token:String,
    role:String,
    createdAt:Number,
    ExpiresIn:Number
})

 tokenSchema.index({createdAt:-1}); // no need tho. not gonna access through any Api...
const refresh_tokenModel = mongoose.model('refreshToken' , tokenSchema);