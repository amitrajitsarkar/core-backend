import express from "express" ;
import AuthController from "../controller/auth.controller";
import validateByZod from "../middleware/validate.middleware";
import { createUserSchema } from "../schema/user.schema";
const signupRouter = express.Router();

const authController = new AuthController();
const validationByZod = new validateByZod();
signupRouter.post("/signup" ,validationByZod.validate(createUserSchema), authController.signup);

export default signupRouter ;