
import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { VerifyCallback } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";

import { userModel } from "../model/userModel";
import { env } from "../config/env";
import { Profile } from "passport";
import { RequestUser } from "../@types/requestUser";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        const existingUser = await userModel.findOne({
          provider: "google",
          providerId: profile.id,
        });

        const email = profile.emails?.[0]?.value;

        const user =
          existingUser ??
          (await userModel.create({
            provider: "google",
            providerId: profile.id,
            name: profile.displayName,
            role: "user",
            ...(profile.username ? { username: profile.username } : {}),
            ...(email ? { email } : {}), 
          }));

        const requestuser: RequestUser = {
          id: user._id.toString(),
          role: user.role,
          ...(user.username ? { username: user.username } : {}),
          ...(user.email ? { email: user.email } : {}),
        };

        return done(null, requestuser);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

// add the strategy for the Github
passport.use(
  new GithubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done : VerifyCallback,
    ) => {
     
      try {
        // finding the user is any by goofle as provider
        const existingUser = await userModel.findOne({
          provider: "github",
          providerId: profile.id,
        });
        // not found --> create one in the db

        const email = profile.emails?.[0]?.value;

        const user =
          existingUser ??
          (await userModel.create({
            provider: "github",
            providerId: profile.id,
            name: profile.displayName,
            role:"user",
            ...(profile.username ? { username: profile.username } : {}),
            ...(email ? { email } : {}), 
          }));

        const requestuser: RequestUser = {
          id: user._id.toString(),
          role: user.role,
          ...(user.username ? { username: user.username } : {}),
          ...(user.email ? { email: user.email } : {}),
        };

        return done(null, requestuser);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
export default passport;
