import { Router } from "express";

const router = Router();

import signupRouter from "./signup.routes";
import loginRouter from "./login.routes";
import deleteUserRouter from "./deleteUser.route";
import protectedRoutes from "./protected.routes";
import promote from "./promote.routes";
import OAuthGoogleRouter from "./OAuth-Google.routes";
import OAuthGithubRoute from "./OAuth-Github.routes";
import availableUserRouter from "./availableUsers.route";




// Everything else grouped
router.use("/api/v1/auth", signupRouter);           // /api/v1/auth/signup, 
router.use("/api/v1/auth", loginRouter);            // /api/v1/auth/login

router.use("/api/v1/user", protectedRoutes);        // /api/v1/user/protected   /api/v1/user/protected/refresh

router.use("/api/v1/user", deleteUserRouter);       // /api/v1/user/delete

router.use("/api/v1/admin", promote);               // /api/v1/admin/promote/:id 

router.use(OAuthGoogleRouter);                       // /auth/google, /auth/google/callback
router.use(OAuthGithubRoute);                        // /auth/github, /auth/github/callback

router.use("/api/v1", availableUserRouter);           // /api/v1/admin/userdata

export default router ;