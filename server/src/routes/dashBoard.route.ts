import { Router } from "express";
import DashBoard from "../controller/dashboard.controller";

const dashBoardRouter = Router();
const dashboardController = new DashBoard();

dashBoardRouter.get("/info",dashboardController.info);


export default dashBoardRouter;