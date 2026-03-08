import {Router} from "express"

import EmailController from "../controller/mail.controller";
const emailController = new EmailController();

const emailRouter = Router();

// this is for the testing purpose .
emailRouter.post("/email/health" , emailController.emailHealth);

// resset password
emailRouter.post("/email/forgot-password",emailController.recoveryMail)

export default emailRouter ;