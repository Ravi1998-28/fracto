import user from '../../models/user';
import nft from '../../models/nft'
import collection from '../../models/collection'
import * as constantsKeys from "../../utils/constantsKey";

export const addCollectionAdmin = async (req, res) => {
    try {
        let file = "";
        if (req.file && req.file.filename) {
            file = req.file.filename;
        }

        let data = {
            [constantsKeys.KEY_NAME]: req.body[constantsKeys.KEY_NAME],
            [constantsKeys.KEY_DESCRIPTION]: req.body[constantsKeys.KEY_DESCRIPTION],
            // [constantsKeys.KEY_USER_ID]: req.body[constantsKeys.KEY_USER_ID],
            [constantsKeys.KEY_IMAGE]: file,
        }
        let success = await collection.create(data)
        if (success) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Collection added by admin successfully",
                data: success,
            });
        }

        else {
            return res.status(200).json({
                status: 200,
                success: false,
                message: "Collection can not added",
            });

        }

    }
    catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });

    }

}

export const listOfAllCollections = async (req, res) => {
    try {

        let success = await collection.find({})
        if (success) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "List of all Collections",
                data: success,
            });
        }

        else {
            return res.status(200).json({
                status: 200,
                success: false,
                message: "no data found",
            });

        }

    }
    catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });

    }

}

export const getCollection = async (req, res) => {
    try {

        let success = await collection.findOne({_id:req.query.id})
        if (success) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Collection",
                data: success,
            });
        }

        else {
            return res.status(200).json({
                status: 200,
                success: false,
                message: "no data found",
            });

        }

    }
    catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });

    }

}
