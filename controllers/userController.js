import User from "../models/userModel.js";

// Admin - Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Updating the user role
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    user.role = role;
    await user.save();

    res.json({ msg: "Role updated", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//  Activating and Deactivating the user
export const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    user.isActive = isActive;
    await user.save();

    res.json({ msg: "User status updated", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};