//const express = require("express");
//import userModel from "../../models/user";
import * as constantsKeys from "../../utils/constantsKey";
import * as slugs from "../../utils/slugs";
import roleModel from '../../models/roles';
//export const routerUsers = express.Router();


export const addRoles = async (req, res) => {
    console.log("req.body", req.body);

    try {
        const role=await roleModel.create({[constantsKeys.KEY_NAME]:req.body.role})
        return res.status(200).json({ success: true,data:role  });
    }catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const Role = async (req, res) => {
    try {
        const roles=await roleModel.find({})
        return res.status(200).json({ success: true,data:roles  });

    }catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const RefreshTokenUser = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        console.log(refreshToken);
        let id;
        console.log("refreshToken :" ,refreshToken);
        if (!refreshToken) throw createError.BadRequest();

        const verify = jwt.verify(
            refreshToken,
            "iAmUserRefreshSecret",
            (err, user_details) => {
                console.log(err);
                console.log("user_details", user_details);
                if (err)
                    return res.status(403).json({
                        success: false,
                        message: "RefreshToken expired, Please login again",
                    });
                id = user_details._id;
                next();
            }
        );
        let payload = {
            _id: id,
        };

        const accessToken = jwt.sign(payload, "iAmUserAccessSecret", {
            expiresIn: "60min",
        });

        return res.status(200).json({
            success: true,
            message: "New access Token",
            accessToken: accessToken,
        });
    } catch (error) {
        next(error);
    }
};

