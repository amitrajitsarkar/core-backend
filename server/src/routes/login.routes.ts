import express from "express" ;
import AuthController from "../controller/auth.controller";
import { loginSchema } from "../schema/login.schema";
import validatebyZod from "../middleware/validate.middleware";
const loginRouter = express.Router() ;
const logincontroller = new AuthController();
const validateByZod = new validatebyZod()

loginRouter.post("/login" , validateByZod.validate(loginSchema) , logincontroller.login);

export default loginRouter;