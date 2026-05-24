import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/ApiResponse';

class DashBoard {
    public info = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json(
            new ApiResponse(
                200,
                'Infos: ',
                {
                    name: 'API Routes',
                    baseUrl: '/api/v1',

                    Authentication: {
                        Signup: '/auth/signup',
                        Login: '/auth/login',
                    },

                    User: {
                        Protected: '/user/protected',
                        'Refresh Token': '/user/protected/refresh',
                        Logout: '/user/logout',
                        'Delete Account': '/user/delete',
                        'Email Health': '/user/email/health',
                        'Forgot Password': '/user/email/forgot-password',
                        Transactions: '/user/transaction',
                    },

                    Admin: {
                        'Promote User': '/admin/promote/:id',
                        'Admin Data': '/admin/userdata',
                        'Moderator Data': '/moderator/userdata',
                    },

                    OAuth: {
                        'Google Login': '/auth/google',
                        'Google Callback': '/auth/google/callback',
                        'Github Login': '/auth/github',
                        'Github Callback': '/auth/github/callback',
                    },
                },
                true,
            ),
        );
    };
}

export default DashBoard;
