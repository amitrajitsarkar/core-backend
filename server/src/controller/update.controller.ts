import { NextFunction, Request, Response } from "express";
import updateService from "../service/update.service";

import ApiResponse from "../utils/ApiResponse";
import * as E from "../utils/specificErrors"
export class UpdateController {
  private updateLogic = new updateService();

  delete = async (req: Request, res: Response) => {
    const user = await this.updateLogic.deleteUser(req.body);
    // Clear tokens

    res.clearCookie('accessToken', {
    httpOnly: true,
    secure: false, // only for dev env.
    sameSite: 'strict'
  });
  
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false, // only for dev env.
    sameSite: 'strict'
  });
    return res
      .status(204)
      .json(new ApiResponse(204, "User deleted", user.message, true));
  };

  patchUserRole = async (req: Request, res: Response,next:NextFunction) =>{
      try{
        const user = await this.updateLogic.patchuserRole(req);
        const updatedTo= req.body.role;
        if(!user || !updatedTo){
            throw new E.BadRequestError("couldn't get user or target Role for response");
        }

        const userPublic : Pick<typeof user, 'username' | 'email' | 'role'> = {
          role:user.role,
          ...(user.username != undefined ? {username : user.username} : {}), // null is neede for db thats why
          ...(user.email != undefined ? {email : user.email} : {})
          
        }


        return res.status(200).json(
            new ApiResponse(200,`${user.username} role updated to ${updatedTo}` , userPublic,true)
        )


      }catch(err){
         next(err);
      }
    
   }
}
