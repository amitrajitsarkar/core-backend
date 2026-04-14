import { CookieOptions, NextFunction, Request, Response } from 'express';
import updateService from '../service/update.service';

import ApiResponse from '../utils/ApiResponse';
import * as E from '../utils/specificErrors';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';


import { userModel } from '../model/userModel';

interface JWTPayload {
  id: string;
  role: string;
  iat: number;  // issued at (timestamp in seconds)
  exp: number;  // expires at (timestamp in seconds)
}

export class UpdateController {
    private updateLogic = new updateService();

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const { accessToken } = req.cookies;
            if(!accessToken){
                throw new E.BadRequestError("Access token not found");
            }

            const decoded = jwt.verify(accessToken, env.ACCESS_SECRET_KEY) as JWTPayload;

            const id = decoded.id ;

            const user = await userModel.findByIdAndUpdate(
                id,
                {
                    $unset:{
                        refreshToken:1, // deleting the 
                    }
                },
                {new:true}
            ).select('username role');

            const options:CookieOptions = {
                httpOnly: true,
                secure: false, // only for dev env.
                sameSite: 'strict' , // or needed as const means--> sameSite: 'strict' as const
            }
            res.clearCookie('accessToken', options);
            res.clearCookie('refreshToken', options);

            return res
                .status(200)
                .json(new ApiResponse(200, 'User logged out', {
                    "username : " : user?.username,
                    "role : " : user?.role,  
                }, true));
        } catch (err) {

            next(err);
        }
    };
    delete = async (req: Request, res: Response) => {
        const user = await this.updateLogic.deleteUser(req.body);
        // Clear tokens

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: false, // only for dev env.
            sameSite: 'strict',
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false, // only for dev env.
            sameSite: 'strict',
        });
        return res
            .status(204)
            .json(new ApiResponse(204, 'User deleted', user.message, true));
    };

    patchUserRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.updateLogic.patchuserRole(req);
            const updatedTo = req.body.role;
            if (!user || !updatedTo) {
                throw new E.BadRequestError(
                    "couldn't get user or target Role for response",
                );
            }

            const userPublic: Pick<typeof user, 'username' | 'email' | 'role'> =
                {
                    role: user.role,
                    ...(user.username != undefined
                        ? { username: user.username }
                        : {}), 
                    ...(user.email != undefined ? { email: user.email } : {}),
                };

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        `${user.username} role updated to ${updatedTo}`,
                        userPublic,
                        true,
                    ),
                );
        } catch (err) {
            next(err);
        }
    };
}
