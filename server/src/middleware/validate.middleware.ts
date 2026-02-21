import { Response, Request, NextFunction } from "express";
import {z} from "zod";
import { ZodObject } from "zod";
import { ZodValidationError } from "../utils/specificErrors";
import * as E from "../utils/specificErrors"


// validate is used in the : delete user route
// validateRole is used in the : promote route.
class validatebyZod{

   validate =
    (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.body);
  
      if (!result.success) {
        return next(
          new ZodValidationError(result.error.flatten((issue) => issue.message)),
        );
      }
  
      req.body = result.data;
      next();
    };


    validateTargetRole = (req:Request, res: Response, next: NextFunction) => {
    
        const targetRole = req.params.role;
        if(!targetRole){
            throw new E.BadRequestError("target role is not available");
        }

        const roleSchema = z.enum(["user" , "developer" , "admin"]);

        const result = roleSchema.safeParse(targetRole);

        if(!result.success){
            return next(new E.BadRequestError("Invalid Role"));
        }

        next();
    }
}

export default  validatebyZod;