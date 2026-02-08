import mongoose from "mongoose";


const {Schema} = mongoose;

const tokenSchema = new Schema({
    userId:mongoose.Schema.Types.ObjectId,
    refresh_token:String,
    createdAt:Date,
    expiresAt:Date
})

 // tokenSchema.index({createdAt:-1}); // no need tho. not gonna access through any Api...
 tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }) ; // auto delete
export const refresh_tokenModel = mongoose.model('refreshToken' , tokenSchema);