import { Response, Request, NextFunction } from "express";
import { ZodObject } from "zod";
import { ZodValidationError } from "../utils/specificErrors";

export const validate =
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
