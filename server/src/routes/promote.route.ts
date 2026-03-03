import { Router } from "express";
import { UpdateController } from "../controller/update.controller";
import validateAdmin from "../middleware/validateRole.middleware"
import validatebyZod from "../middleware/validate.middleware";
import setReqHeader from "../middleware/setReqHeader";

const checkbyZod = new validatebyZod(); // .validateTargetRole checks weather the terget role is valid or not via zod
const updateLogic = new UpdateController();

const promote = Router();

promote.patch("/promote/:id",setReqHeader,validateAdmin,checkbyZod.validateTargetRole,updateLogic.patchUserRole);

export default promote;