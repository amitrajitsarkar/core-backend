import { env } from "../config/env";
import { UserTypes } from "../@types/UserFromDb";
import jwt from "jsonwebtoken";



class CreateToken {

    createAccessToken  = function signAccessToken(User:UserTypes){
        const ACCESS_SECRET_KEY : string = env.ACCESS_SECRET_KEY;
        const accessToken = jwt.sign(
            { id : User._id,
                role : User.role? User.role : "user"
            },
            ACCESS_SECRET_KEY,
            {expiresIn : '1h'}
            );
        return accessToken;
        }
    createRefreshToken
  = function signRefreshToken(User:UserTypes){
        const REFRESH_SECRET_KEY : string = env.REFRESH_SECRET_KEY;
        const refreshToken = jwt.sign(
              {
                id:User._id
              },

              REFRESH_SECRET_KEY,
              {
                expiresIn : '7days'
              }
            )
        return refreshToken;
    }
}

export default CreateToken