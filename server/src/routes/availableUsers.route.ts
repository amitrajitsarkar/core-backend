import { Router } from 'express';

import jwtHandler from '../middleware/jwtHandler.middleware'; // add the user in the request
import validateAdmin from '../middleware/validateAdmin.middleware'; // validating the admin role
import validateModerator from '../middleware/validateModerator.middleware';
import ShowData from '../controller/protectedData.controller';
const availableUserRouter = Router();
const showData = new ShowData();

availableUserRouter.get(
    '/admin/userdata',
    jwtHandler,
    validateAdmin,
    showData.showUsersToAdmin,
);

availableUserRouter.get(
    '/moderator/userdata',
    jwtHandler,
    validateModerator,
    showData.showUsersToModerator,
);

export default availableUserRouter;
