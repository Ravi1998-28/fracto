import * as collectionCtrl from "../controllers/user/collection"
const express = require("express");
const routerCollec = express.Router();
import { auth_user } from "../middlerware/jwt";
import * as slugs from"../utils/slugs"
import {nftDetails} from "../controllers/user/nft";
import {SLUGS_COLLECTION, SLUGS_LIST_ALL_COLLECTIONS} from "../utils/slugs";
const multer = require('multer');

import AWS from "aws-sdk";
import multerS3 from "multer-s3";

////Aws

AWS.config.update({
    accessKeyId: "AKIAXKR6HGL43IRJMY76",
    secretAccessKey: "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",
});
let s3 = new AWS.S3();

//const storage = multer.memoryStorage();

//  uploding image via multer and S3
const uploadImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: "artequitys",
        key: function (req, file, cb) {
            const folderPath = "artequit/"; // Replace with your desired folder path
            const filename = "user" + Date.now() + file.originalname;
            const filePath = folderPath + filename;
            cb(null, filePath);
        },
    }),
    limits: { fileSize: 30000000 }, // In bytes: 30000000 bytes = 30 MB
}).fields([
    { name: "image" },
]);

////end Aws

// let storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/collectionImage');
//     },
//     filename: function(req, file, cb) {
//         //console.log("midleware...", req);
//         cb(null, file.originalname.replace(/\\/g, "/"));
//     }
//
// });

//let uploadImage = multer({ storage: storage }).single('image');

routerCollec.post(slugs.SLUGS_ADD_COLLECTION,auth_user, uploadImage,collectionCtrl.addCollectionAdmin);
routerCollec.get(slugs.SLUGS_LIST_ALL_COLLECTIONS,collectionCtrl.listOfAllCollections);
routerCollec.get(slugs.SLUGS_COLLECTION,collectionCtrl.getCollection);
routerCollec.post('/editCollection',auth_user, uploadImage,collectionCtrl.editCollection);
routerCollec.get('/listNftInCollection',collectionCtrl.listNftInCollection);

module.exports=routerCollec;