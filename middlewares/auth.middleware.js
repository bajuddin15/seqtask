import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { USER_ROLES } from "../utils/constants.js";
const validateToken = async (req, res, next) => {
  const token = req.headers["Authorization"];
  if (!token) {
    return res.status(401).json({
      success: true,
      message: "Access denied. no token provided",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(409).json({
        message: "Invalid token",
      });
    }

    const userId = decodedToken;
    const findUser = await User.findById(userId);
    req.user = findUser;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === USER_ROLES.ADMIN) {
    next();
  } else {
    return res.status(409).json({
      success: false,
      message: "You can not perform this operation",
    });
  }
};

export { validateToken, isAdmin };
