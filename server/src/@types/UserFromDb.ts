import { Types } from "mongoose"

export interface UserTypes  {
    _id:Types.ObjectId,
     role: "user" | "developer" | "moderator" | "admin";
    email?: string | null;
    username?: string | null;
    name?: string | null;
    password?: string | null;
    provider?: "google" | "github" | null;
    providerId?: string | null;
    refreshToken?: string | null;
    expiresIn?: Date | null;
    createdAt?: Date;
    }