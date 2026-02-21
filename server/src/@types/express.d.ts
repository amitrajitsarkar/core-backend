import { reqUserPayload } from "./jwt";

declare global {
  namespace Express {
    interface Request {
      user?: reqUserPayload;
      role?:string;
    }
  }
}