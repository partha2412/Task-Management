import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAuth = async (req, res, next) => {
    try {
        // const cookies = req.headers.cookie;

        // if (!cookies) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Unauthorized. No token provided.",
        //     });
        // }

        // const token = cookies
        //     .split("; ")
        //     .find((cookie) => cookie.startsWith("token="))
        //     ?.split("=")[1];
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Token not found.",
            });
        }

        // console.log("token:", token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userId)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};
