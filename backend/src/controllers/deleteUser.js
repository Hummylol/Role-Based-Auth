import userModel from "../models/userModel.js";

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

export default deleteUser;