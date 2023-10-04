import * as userCtrl from "../controllers/user/user"
import * as walletCtrl from "../controllers/user/wallet"
const express = require("express");
const routerUser = express.Router();
//import { auth_user } from "../../middleware/jwt";
import * as slugs from"../utils/slugs"
import {Role} from "../controllers/user/user";
import { auth_user } from "../middlerware/jwt";
import {SLUG_GET_USER_PROFILE, SLUG_SEND_OTP, SLUG_VERIFY} from "../utils/slugs";

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
    { name: "display_picture" },
]);

////end Aws


// let storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/userImage');
//     },
//     filename: function(req, file, cb) {
//         //console.log("midleware...", req);
//         cb(null, file.originalname.replace(/\\/g, "/"));
//     }
//
// });
//
// let uploadImage = multer({ storage: storage }).single('display_picture');

routerUser.post(slugs.SLUG_ADD_USERS, walletCtrl.addWallet);
routerUser.post(slugs.SLUG_DISCONNECT_WALLET, auth_user,walletCtrl.walletDisconnect);
routerUser.post(slugs.SLUG_ADD_ROLE, userCtrl.addRoles);
routerUser.get(slugs.SLUG_ROLE, userCtrl.Role);
routerUser.get(slugs.SLUG_LIST_ALL_USERS,auth_user, userCtrl.listOfUsers);
routerUser.get(slugs.SLUG_GET_USER_PROFILE,auth_user, userCtrl.getProfile);
routerUser.put(slugs.SLUG_EDIT_USER_PROFILE,auth_user,uploadImage, userCtrl.updateProfile);
routerUser.post(slugs.SLUG_SEND_OTP,auth_user, userCtrl.sendOtp);
routerUser.post(slugs.SLUG_VERIFY,auth_user, userCtrl.verifyOtp);
routerUser.post(slugs.SLUG_BLOCK_AND_UNBLOCK_USER,auth_user, userCtrl.blockAndUnblockUser);
routerUser.delete(slugs.SLUG_DELETE_USER,auth_user, userCtrl.deleteUser);

module.exports=routerUser;




//module.exports=routerUser;