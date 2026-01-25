import express from "express" ;
import AuthController from "../controller/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { CreateUserInput, createUserSchema } from "../schema/user.schema";

const loginRouter = express.Router() ;
const logincontroller = new AuthController();

loginRouter.post("/login" , validate(createUserSchema) , logincontroller.login);

export default loginRouter;