import { RequestUser } from "./requestUser";

declare global {
  namespace Express {
    interface User extends RequestUser{}
    interface Request {
      user?: RequestUser;
    }
  }
}

export {};