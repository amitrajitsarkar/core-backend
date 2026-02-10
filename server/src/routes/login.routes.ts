import express from "express" ;
import AuthController from "../controller/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema } from "../schema/login.schema";
const loginRouter = express.Router() ;
const logincontroller = new AuthController();

loginRouter.post("/login" , validate(loginSchema) , logincontroller.login);

export default loginRouter;