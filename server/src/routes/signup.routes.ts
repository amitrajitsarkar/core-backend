import express from "express" ;
import AuthController from "../controller/auth.controller";

const signupRouter = express.Router();

const authController = new AuthController();

signupRouter.post("/signup" , authController.signup);

export default signupRouter ;