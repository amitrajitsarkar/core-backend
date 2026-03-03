import { NextFunction, Request, Response } from 'express';
import ProtectedData from '../service/protecteddata.service';
import ApiResponse from '../utils/ApiResponse';

const protectedData = new ProtectedData();

class ShowData {
    public showUsersToAdmin = async(req: Request, res: Response,next:NextFunction): Promise<void> => {
        try {
           const data = await protectedData.AdminOnlyData();
           res.status(200).json(
            new ApiResponse(200,"Successfully fetched data",data,true)
           );
        } catch (error) {
            next(error);
        }
    };

    public showUsersToModerator = async(req: Request, res: Response,next:NextFunction): Promise<void> => {
        try {
           const data = await protectedData.ModeratorOnlyData();
           res.status(200).json(
            new ApiResponse(200,"Successfully fetched data",data,true)
           );
        } catch (error) {
            next(error);
        }
    };


}


export default ShowData ;