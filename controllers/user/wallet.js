const express = require("express");
import userModel from "../../models/user";
import roleModel from "../../models/roles";
import jwt from "jsonwebtoken";
export const addWallet = async (req, res) => {


    try {
        console.log("e",req.body)

        let userDataAddress = await userModel.findOne({wallet_address:req.body.wallet_address});

        if (userDataAddress && userDataAddress.role === 'user') {
            // if(userDataAddress.deleted === 1){
            //     return res
            //         .status(200)
            //         .json({ success: false, message: "Your account is deleted by Admin",});
            // }

            // if(userDataAddress.status === 0){
            //     return res
            //         .status(200)
            //         .json({ success: false, message: "Your Profile has been blocked by admin. Please contact support@metaprops.io",});
            // }

            if(userDataAddress.role != req.body.role){
                return res
                    .status(200)
                    .json({ success: false, message: "not authorised role..",});
            };



            userDataAddress.wallet_status=1;
            await userDataAddress.save();

            let payload = {
                _id: userDataAddress._id,
            };

            const accessToken = jwt.sign(payload, "iAmUserAccessSecret", {
                expiresIn: "60min",
            });

            const Refreshtoken = jwt.sign(payload, "iAmUserRefreshSecret", {
                expiresIn: "120min",
            });
            return res
                .status(200)
                .json({ success: true, message: "you are successfully login",accessToken,Refreshtoken,data:userDataAddress });
        };

        if(req.body.role === 'user' || req.body.role === 'admin') {
            const userData = {
                wallet_address: req.body.wallet_address,
                role: req.body.role,
            };
            let userDataRes = await new userModel(userData);
            await userDataRes.save();
            let payload = {
                _id: userDataRes._id,
            }
            const accessToken = jwt.sign(payload, "iAmUserAccessSecret", {
                expiresIn: "60min",
            });

            const Refreshtoken = jwt.sign(payload, "iAmUserRefreshSecret", {
                expiresIn: "120min",
            });

            return res
                .status(200)
                .json({
                    success: true,
                    message: "you are succesfully login",
                    accessToken,
                    Refreshtoken,
                    data: userDataRes
                });

        }else{
            return res
                .status(200)
                .json({
                    success: false,
                    message: "not authorised role.",
                });
        }


    } catch (error) {
        console.log("there are ", error);
        return res
            .status(500)
            .json({ success: false, message: "There are some error" });
    }
};
export const walletDisconnect = async (req, res) => {


    try {

        let userDataAddress = await userModel.findById(req.user._id);

        if (userDataAddress) {
            userDataAddress.wallet_status=0
            console.log("hey")
            await userDataAddress.save()
            return res
                .status(200)
                .json({ success: true, message: "your wallet disconnected Succesfully" });
        }
        return res
            .status(200)
            .json({ success: false, message: "your wallet address doesn't exist" });

    } catch (error) {
        console.log("there are ", error);
        return res
            .status(500)
            .json({ success: false, message: "There are some error" });
    }
};
