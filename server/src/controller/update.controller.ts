import { Request, Response } from "express";
import updateService from "../service/update.service";
import ApiResponse from "../utils/ApiResponse";
export class UpdateController {
  private updateLogic = new updateService();

  delete = async (req: Request, res: Response) => {
    const user = await this.updateLogic.deleteUser(req.body);

    return res
      .status(204)
      .json(new ApiResponse(204, "User deleted", user.message, true));
  };
}
