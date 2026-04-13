import { Router } from "express";

const router = Router();

import signupRouter from "./signup.route";
import loginRouter from "./login.route";
import deleteUserRouter from "./deleteUser.route";
import protectedRoutes from "./protected.route";
import promote from "./promote.route";
import OAuthGoogleRouter from "./OAuth-Google.route";
import OAuthGithubRoute from "./OAuth-Github.route";
import availableUserRouter from "./availableUsers.route";
import emailRouter from "./email.route";
import resetPasswordRouter from "./reset-password.route";
import testRouter from "./TEST.route";
import logoutRouter from "./logout.route";
import transactionRouter from "./transaction.route"


// ! testing route
router.use(testRouter); // mimicking the FE

// Everything else grouped
router.use("/api/v1/auth", signupRouter);           // /api/v1/auth/signup, 
router.use("/api/v1/auth", loginRouter);            // /api/v1/auth/login

router.use("/api/v1/user", protectedRoutes);        // /api/v1/user/protected   /api/v1/user/protected/refresh

router.use("/api/v1/user" ,logoutRouter);           // /api/vq/user/logout

router.use("/api/v1/user", deleteUserRouter);       // /api/v1/user/delete

router.use("/api/v1/admin", promote);               // /api/v1/admin/promote/:id 

router.use(OAuthGoogleRouter);                       // /auth/google, /auth/google/callback
router.use(OAuthGithubRoute);                        // /auth/github, /auth/github/callback

router.use("/api/v1", availableUserRouter);           // /api/v1/admin/userdata  api/v1/moderator/userdata

router.use("/api/v1/user", emailRouter);             // api/v1/user/email/health -- for testing the email(gmail) service

router.use("/api/v1/user", resetPasswordRouter)      // api/v1/user/email/forgot-password

router.use("/api/v1/user" , transactionRouter)

export default router ;