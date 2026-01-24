import express from "express" ;
import AuthController from "../controller/Auth.controller";

const router = express.Router();

const authController = new AuthController();

router.post("/signup" , authController.signup);

export default router ;