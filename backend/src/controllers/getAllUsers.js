import userModel from "../models/userModel.js"
const getAllusers = async (req, res) => {
    try {
        const users = await userModel.find().select("username role createdAt")
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}

export default getAllusers;