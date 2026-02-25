// can also be in the config area

import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import { userModel } from "../model/userModel";
import { env } from "../config/env";
import { Profile  } from "passport";
import type { VerifyCallback } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret : env.GOOGLE_CLIENT_SECRET,
            callbackURL : "/auth/google/callback",
        },
        async (accessToken:string , refreshToken:string ,profile:Profile ,done:VerifyCallback) =>{
            try{
                // finding the user is any by goofle as provider
                let user = await userModel.findOne({
                    provider:"google",
                    providerId : profile.id
                }) ;
                // not found --> create one in the db

                const email = profile.emails?.[0]?.value;
                if(!user){
                    user = await userModel.create({
                        provider: "google",
                        providerId:profile.id,
                        name:profile.displayName,
                        ...(email ? {email} : {}) // this is used to satisfy the type email in ORM
                    });
                }
                return done(null,user);
            }catch(err){
                return done(err,false);
            }
        }
            
    )
)