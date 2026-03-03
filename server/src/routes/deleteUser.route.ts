import { Router } from "express";
import { UpdateController } from "../controller/update.controller";
import { updateUserSchema } from "../schema/deleteUser.schema";
import validatebyZod from "../middleware/validate.middleware";

const validateByZod = new validatebyZod();

const deleteUserRouter = Router(); 
const deleteController = new UpdateController();

deleteUserRouter.delete("/delete", validateByZod.validate(updateUserSchema), deleteController.delete);

export default deleteUserRouter;