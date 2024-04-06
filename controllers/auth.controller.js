import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const findUser = await User.findOne({
      email,
    });

    if (findUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered",
      data: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({
      email,
    });

    if (!findUser) {
      return res.status(409).json({
        success: false,
        message: "User not exist",
      });
    }

    const passwordMatch = await bcrypt.compare(password, findUser?.password);

    if (!passwordMatch) {
      return res.status(409).json({
        success: false,
        message: "Invalid credientials.",
      });
    }

    res.status(201).json({
      success: true,
      message: "User logged in",
      data: {
        name: findUser.name,
        email: findUser.email,
        role: findUser.role,
        token: generateToken(findUser?._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export { registerUser, loginUser };
