//const express = require("express");
import * as constantsKeys from "../../utils/constantsKey";
import * as slugs from "../../utils/slugs";
import roleModel from '../../models/roles';
import userModel from "../../models/user";
import jwt from "jsonwebtoken";
//export const routerUsers = express.Router();


export const listOfUsers = async (req, res) => {

    try {
        console.log("e",req.body)

        let usersList = await userModel.find({role:"user"});


        return res
            .status(200)
            .json({
                success: true,
                message: "List of all users.",
                data:usersList
            });

    } catch (error) {
        console.log("there are ", error);
        return res
            .status(500)
            .json({ success: false, message: "There are some error" });
    }
};


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


export const getProfile = async (req, res) => {
    try {

        // let userDataAddress = await userModel.findById(req.user._id);
        let userDataAddress = await userModel.findOne({_id:req.query.id});

        return res
            .status(200)
            .json({ success: true, data:userDataAddress  });

    } catch (error) {
        console.log("there are ", error);
        return res
            .status(500)
            .json({ success: false, message: "There are some error" });
    }
};
export const updateProfile = async (req, res) => {
    try {
        // let file = "";
        // if (req.file && req.file.filename) {
        //     file = req.file.filename;
        // }
        let userDataAddress = await userModel.findById(req.user._id);
        if(req.body.phone_no){
            userDataAddress.phone_no=req.body.phone_no
        }
        if(req.body.email){
            userDataAddress.email=req.body.email
        }
        if(req.body.date_of_birth){
            userDataAddress.date_of_birth=req.body.date_of_birth
        }
        if(req.body.name){
            userDataAddress.name=req.body.name
        }
        if(req.body.occupation){
            userDataAddress.occupation=req.body.occupation
        }
        if(req.body.bio){
            userDataAddress.bio=req.body.bio
        }
        if(req.body.link){
            userDataAddress.link=req.body.link
        }
        if(req.files?.display_picture[0]?.location){
            userDataAddress.display_picture=req.files?.display_picture[0]?.location;
        }
        // if(req.files.cover_picture){
        //     userDataAddress.cover_picture=req.files.cover_picture[0].location
        // }
        await userDataAddress.save();

        return res
            .status(200)
            .json({ success: true, data:userDataAddress  });

    } catch (error) {
        console.log("there are ", error);
        return res
            .status(500)
            .json({ success: false, message: "There are some error" });
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

