import { Request, Response } from 'express';

class ShowUser {
    public showUsersToAdmin = (req: Request, res: Response): void => {
        try {
            res.status(200).json({ message: 'Success --  admin checking is working' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}


export default ShowUser ;