import jwt from "jsonwebtoken"
import passport from "passport"

import CreateToken from "../utils/createToken";


import Router from "express"
const OAuthGoogleRouter = Router();
const createToke = new CreateToken();

//Start Login
OAuthGoogleRouter.get("/auth/google",
    passport.authenticate("google" ,{ scope : ["profile" , "email"] })
);

// Google comes back here 
OAuthGoogleRouter.get("/auth/google/callback",
    passport.authenticate("google" , {session : false , failureRedirect: "/fail"}),
    (req,res)=>{
        const user = req.user; // created by the passport 

        // issue your jwt
        

    }

)
