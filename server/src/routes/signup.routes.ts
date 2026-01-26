import express from "express" ;
import AuthController from "../controller/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserSchema } from "../schema/user.schema";
import errorHandler from "../middleware/errorHandler.middlewares";
const signupRouter = express.Router();

const authController = new AuthController();

signupRouter.post("/signup" ,validate(createUserSchema), authController.signup);

export default signupRouter ;