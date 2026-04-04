import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;    

  try {
    // Checking if the  token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
        // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from DB 
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({ msg: "Not authorized, no token" });
    }
  } catch (error) {
    return res.status(401).json({ msg: "Token failed" });
  }
};