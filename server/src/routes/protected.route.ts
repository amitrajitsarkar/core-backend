import { Router } from "express";
import Protected from "../controller/protected.controller";
import jwtHandler from "../middleware/jwtHandler.middleware";

const p = new Protected();
const protectedRoutes = Router();

protectedRoutes.get("/protected" ,jwtHandler,p.protectedController);
protectedRoutes.get("/protected/refresh",p.refreshController);

export default protectedRoutes ;