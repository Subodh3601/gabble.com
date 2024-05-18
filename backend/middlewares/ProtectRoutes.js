import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const protectedRoute = async (req,res,next) => {
    try {
        //console.log("req.cookie :    :", req.cookies.jwt)
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ message: "User not authenticated : no token" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "User not authenticated : Invalid token" })

        }
        const user = await User.findOne({ _id: decoded.userId }).select("-password"); //.select is done to prevent sending password
        
        if (!user) {
            return res.status(404).json({ message: "User not found" })
 
        }

        req.user = user;

        next();

    } catch (err) {
        console.log("Error in protected middlewares", err.message);
        return res.status(500).json({ message: "internal server error" });

    }
}