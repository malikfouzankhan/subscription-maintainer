import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import genTokenAndSetCookie from "../utils/genTokenAndSetCookie.js";

export const signup = async (req, res) => {
      try {
            let { email, password, name } = req.body;

            if (!email || !password || !name) {
                  throw new Error("All fields are required!!");
            }

            const userAlreadyExists = await User.findOne({ email });
            if (userAlreadyExists) {
                  return res.status(400).json({
                        success: false,
                        message: "User already exists!",
                  });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                  name,
                  email,
                  password: hashedPassword,
            });

            await user.save();

            genTokenAndSetCookie(res, user._id);

            res.status(201).json({
                  success: true,
                  message: "User created successfully",
            });
      } catch (error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
      }
};

export const login = async (req, res) => {
      try {
            let { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(400).json({
                        success: false,
                        message: "Invalid credentials",
                  });
            }

            const isPasswordValid = await bcrypt.compare(
                  password,
                  user.password,
            );
            if (!isPasswordValid) {
                  return res.status(400).json({
                        success: false,
                        message: "Invalid credentials",
                  });
            }

            genTokenAndSetCookie(res, user._id);

            await user.save();

            res.status(200).json({
                  success: true,
                  message: "Logged in successfully",
            });
      } catch (error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
      }
};

export const logout = async (req, res) => {
      try {
            res.clearCookie("token");
            res.status(200).json({
                  success: true,
                  message: "Logged out successfully",
            });
      } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: error.message });
      }
};