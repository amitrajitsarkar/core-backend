import { JwtPayload } from "jsonwebtoken";

export interface reqUserPayload extends JwtPayload{
    id: string;
    role: "user" | "developer" | "moderator" | "admin";
}
