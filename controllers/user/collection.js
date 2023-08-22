import user from '../../models/user';
import nft from '../../models/nft'
import collection from '../../models/collection'
import * as constantsKeys from "../../utils/constantsKey";
let ObjectId = require('mongodb').ObjectID;
let mongoose = require('mongoose');
import tokenCollection from '../../models/tokenCollection';

export const addCollectionAdmin = async (req, res) => {
    try {
        // let file = "";
        // if (req.file && req.file.filename) {
        //     file = req.file.filename;
        // }
       // console.log("req.files?.image?.location ",req.files?.image);

        let data = {
            [constantsKeys.KEY_NAME]: req.body[constantsKeys.KEY_NAME],
            [constantsKeys.KEY_DESCRIPTION]: req.body[constantsKeys.KEY_DESCRIPTION],
            // [constantsKeys.KEY_USER_ID]: req.body[constantsKeys.KEY_USER_ID],
            [constantsKeys.KEY_IMAGE]: req.files?.image[0]?.location,
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


export const editCollection = async (req, res) => {

    try {
        let where ={ [constantsKeys.KEY_UNDERSCOR_ID]: req.body[constantsKeys.KEY_COLLECTION_ID] };
        let data = req.body;

        delete data[constantsKeys.KEY_COLLECTION_ID];
        // if (req.file && req.file.filename) {
        //     data["image"] = req.file.filename;
        // }
        data["image"] = req.files && req.files.image && req.files.image[0] ? req.files.image[0].location : undefined;
        const collectionList = await collection.findOneAndUpdate(where,data);

        return res.status(200).json({
            status: 200,
            success: true,
            message: "collection updated successfully",
        });
    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }

}

export const listNftInCollection = async (req, res) => {

    try {
           let where = [
            {
                $match: {
                    [constantsKeys.KEY_COLLECTION_ID]: new mongoose.Types.ObjectId(req.query[constantsKeys.KEY_COLLECTION_ID])
                }
            },
            {
                $lookup: {
                    "from": 'nfts',
                    "localField": 'token_id',
                    "foreignField": constantsKeys.KEY_UNDERSCOR_ID,
                    "as": 'nft_data'
                }
            },


        ]

      const data = await tokenCollection.aggregate(where);

        if (data) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "list of NFT in collection ",
                data: data,
            });
        } else {
            return res.status(200).json({
                status: 400,
                success: false,
                message: "No NFT found",
                data: {},
            });
        }
    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
