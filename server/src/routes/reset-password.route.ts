import { env } from "../config/env";
import {Request,Response} from "express"
import {Router} from "express" ;
import AuthController from "../controller/auth.controller";

const resetPasswordRouter = Router();
const authController = new AuthController();

// GET - user clicks email link for FE
/*
resetPasswordRouter.get("/reset-password", async (req:Request, res:Response) => {
  const { token } = req.query;

  // redirect to frontend page with token
  res.redirect(`${env.CLIENT_URL}/reset-password?token=${token}`);
});
*/


// forgot password
resetPasswordRouter.post("/reset-password",authController.resetPassword); 


export default resetPasswordRouter ;