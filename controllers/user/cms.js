const express = require("express");
import cmsModel from "../../models/cms";



import * as constantsKeys from "../../utils/constantsKey";


export const addTermsAndCondition = async (req, res) => {
    try {
        var data =
            {
                [constantsKeys.KEY_TERMS_CONDITIONS]: req.body[constantsKeys.KEY_TERMS_CONDITIONS]
            }
            console.log("fdvgdfvdv")
        var count = await cmsModel.countDocuments();
        var success = count == 0 ? await cmsModel.create(data) : await cmsModel.findOneAndUpdate({}, data);
        var data = await cmsModel.findOne({});

        if (success) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "terms and condition added successfully",
            });
        }

        else {
            return res.status(200).json({
                status: 400,
                success: false,
                message: "cms can not added",
            });
        }
    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getTermsAndCondition = async (req, res) => {
    try {
        var return_data = {

            [constantsKeys.KEY_TERMS_CONDITIONS]: 1
        };
        const data = await cmsModel.findOne({}).select([constantsKeys.KEY_TERMS_CONDITIONS]);
        //select(return_data);

        if (data) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "get terms and condition successfully",
                data: data,
            });
        } else {
            return res.status(200).json({
                status: 400,
                success: false,
                message: "not able to get terms and condition",
                data: {},
            });
        }
    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const addPrivacyPolicy = async (req, res) => {
    try {
        var data =
            {
                [constantsKeys.KEY_PRIVACY_POLICY]: req.body[constantsKeys.KEY_PRIVACY_POLICY]
            }
        var count = await cmsModel.countDocuments();
        var success = count == 0 ? await cmsModel.create(data) : await cmsModel.findOneAndUpdate({}, data);


        if (success) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Privacy pollicy added successfully",
                // data: success,
            });
        }

        else {
            return res.status(200).json({
                status: 400,
                success: false,
                message: "Privacy pollicy can not added",
            });
        }
    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getPrivacyPolicy = async (req, res) => {
    try {
        var return_data = {

            [constantsKeys.KEY_PRIVACY_POLICY]: 1
        };
        const data = await cmsModel.findOne({}).select('privacy_policy')
        //.select(return_data);;

        if (data) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "get privacy policy successfully",
                data: data,
            });
        } else {
            return res.status(200).json({
                status: 400,
                success: false,
                message: "not able to get privacy policy",
                data: {},
            });
        }
    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const addHelpAndGuidance = async (req, res) => {
    try {
        var data =
            {
                [constantsKeys.KEY_HELP_AND_GUIDANCE]: req.body[constantsKeys.KEY_HELP_AND_GUIDANCE]
            }
        var count = await cmsModel.countDocuments();
        var success = count == 0 ? await cmsModel.create(data) : await cmsModel.findOneAndUpdate({}, data);


        if (success) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Help and Guidance added successfully"
            });
        }

        else {
            return res.status(200).json({
                status: 400,
                success: false,
                message: "Privacy pollicy can not added",
            });
        }
    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getHelpAndGuidance = async (req, res) => {
    try {
        const data = await cmsModel.findOne({}).select('help_and_guidance')

        if (data) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "get help and guidance successfully.",
                data: data,
            });
        } else {
            return res.status(200).json({
                status: 400,
                success: false,
                message: "not able to get privacy policy",
                data: {},
            });
        }
    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};