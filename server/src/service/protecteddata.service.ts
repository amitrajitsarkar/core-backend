import { userModel } from '../model/userModel';

class ProtectedData {
    public AdminOnlyData = async () => {
        const data = await userModel.find({});
        return data;
    };

    public ModeratorOnlyData = async () => {
        const data = await userModel.find({
            role: { $nin: ['admin'] },
        });
        console.log(data);
        return data;
    };
}

export default ProtectedData;
