import mongoose from "mongoose";


const {Schema} = mongoose;

const tokenSchema = new Schema({
    userId:mongoose.Schema.Types.ObjectId,
    username:String,
    refresh_token:String,
    createdAt:Date,
    expiresAt:Date 
})

 tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }) ; // auto delete
export const refresh_tokenModel = mongoose.model('refreshToken' , tokenSchema);
