import { JwtPayload } from "jsonwebtoken";

export interface reqUserPayload extends JwtPayload{
    id: string;
    role:string;
}
