import {Router} from "express"

import jwt from "jsonwebtoken"
import passport from "passport"
import CreateToken from "../utils/createToken";
import TokenRepo from "../repository/token.repository";

import { RequestUser } from "../@types/requestUser";
import { UserTypes } from "../@types/UserFromDb";
const OAuthGithubRoute = Router();

const createToken = new CreateToken();
const tokenRepo = new TokenRepo();

//Start Login
OAuthGithubRoute.get("/auth/github",
    passport.authenticate("github" ,{ scope : ["profile" , "email"] })
);


// Google comes back here 
OAuthGithubRoute.get("/auth/github/callback",
    passport.authenticate("github" , {session : false , failureRedirect: "/login"}),
    (req,res)=>{
        const user = req.user as RequestUser; // created by the passport 
        const repoUser = {
            _id: user.id,
            ...(user.username ? {username : user.username } : {})
        }
        // issue  jwt
        const accessToken = createToken.createAccessToken(
            {
                _id : user.id,
                role: user.role ? user.role : "user"
            }
        );
        
        const refreshToken = createToken.createRefreshToken(
            {
                _id : user.id,
                role: user.role ? user.role : "user" 
            }
        )
        // stores in the dB
        tokenRepo.storeRefreshToken(
            {
                id : user.id , 
                ...(user.username ? {username : user.username} : {})

            } 
            ,refreshToken); // wants the _id and username 

    res.cookie('accessToken' , accessToken ,{
      httpOnly:true,
      secure: false, //  only for dev env. 
      sameSite: 'strict' ,
      maxAge: 15*1000, // should not be this low ~15sec only for testing purpose.
    })  

    res.cookie('refreshToken' , refreshToken ,{
      httpOnly:true,
      secure: false, //  only for dev env. 
      sameSite:'strict' ,
      maxAge: 7*24*60*60*1000,
    })

    res.redirect("http://localhost:5000/health") ;

    }

)


export default OAuthGithubRoute ;