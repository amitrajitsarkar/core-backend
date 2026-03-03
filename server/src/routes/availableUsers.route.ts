import { Router } from 'express';

import jwtHandler from '../middleware/jwtHandler.middleware'; // add the user in the request
import validateAdmin from '../middleware/validateRole.middleware'; // validating the admin role
import ShowUser from '../controller/showUsers.controller'; // ShowUser is a class for all the user info

const availableUserRouter = Router();
const showUsers = new ShowUser();

availableUserRouter.get(
    '/admin/userdata',
    jwtHandler,
    validateAdmin,
    showUsers.showUsersToAdmin,
);

export default availableUserRouter;
