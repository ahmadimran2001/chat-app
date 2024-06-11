import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // allusers except the current loggedin user i.e us

    res.status(200).json(filteredUsers);
  } catch (e) {
    console.log("Error in getUsersForSidebar controler", e.console);
    res.ststus(500), json({ error: "Internal Server Error" });
  }
};
