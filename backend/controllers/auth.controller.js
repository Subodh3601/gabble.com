import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from '../utils/generateTokens.js';



export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ error: "Invalid email format" });
        // }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" });
        }

        if (password.length < 4) {
            return res.status(400).json({ error: "Password must be at least 4 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller==", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ error: "Invalid email format" });
        // }

        const existingUser = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser?.password || "")// have to add || "" because bcrypt was throwing error 
        if (!isPasswordCorrect || !existingUser) {
            return res.status(400).json({ error: "User Credentials not matched" });

        }

        generateTokenAndSetCookie(existingUser._id, res);

        res.status(201).json({
            _id: existingUser._id,
            fullName: existingUser.fullName,
            username: existingUser.username,
            email: existingUser.email,
            followers: existingUser.followers,
            following: existingUser.following,
            profileImg: existingUser.profileImg,
            coverImg: existingUser.coverImg,
        });
    } catch (error) {
        console.log("Error in login controller==", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', "", { expires: new Date(0) })
        res.status(200).json({ message: "logged out" })
    } catch (error) {
        console.log("Error in logout controller==", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUser = async (req, res) => {
    try {

        const user = await User.findOne(req.user._id).select("-password");
        res.status(200).json(user);


    } catch (error) {
        console.log("Error in getUser controller==", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}