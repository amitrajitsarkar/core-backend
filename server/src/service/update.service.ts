import { userModel } from "../model/userModel";
import type { updateUserSchemaType } from "../schema/deleteUser.schema";
import { NotFoundError } from "../utils/specificErrors";
import { Request } from "express";
import * as E from "../utils/specificErrors"
class updateService {
    async deleteUser(data:updateUserSchemaType){
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

    async patchuserRole(data:Request){
        const {role} = data.body;
        const id = data.params.id;
        if(!role && !id){
            throw new E.WrongCredential();
        }

        const user = userModel.findByIdAndUpdate(
            id,
            {$set:{role}},
            {new:true} 
        )
    }
}


export default updateService;