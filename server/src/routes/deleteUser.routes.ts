import { Router } from "express";
import { UpdateController } from "../controller/update.controller";
import { validate } from "../middleware/validate.middleware";
import { deleteUserSchema } from "../schema/deleteUser.schema";


const deleteUserRouter = Router(); 
const deleteController = new UpdateController();

deleteUserRouter.post("/delete", validate(deleteUserSchema) , deleteController.delete);

export default deleteUserRouter;