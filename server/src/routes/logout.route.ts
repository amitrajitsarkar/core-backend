import { Router } from "express";
import { UpdateController } from "../controller/update.controller";

const logoutRouter  = Router();
const updateController = new UpdateController();

logoutRouter.get("/logout",updateController.logout);

export default logoutRouter;