import { userModel } from "../model/userModel";
import type { deleteUserSchemaType } from "../schema/deleteUser.schema";
import { NotFoundError } from "../utils/specificErrors";
class updateService {
    async deleteUser(data:deleteUserSchemaType){
        const deletedUser = await userModel.findOneAndDelete({
            username :data.username 
        }) ;

        if(!deletedUser){
            throw new NotFoundError("Cannot delete user: User not found");
        }

        return {
            message: `${data.username} deleted successfully`,
        };
    }
}


export default updateService;