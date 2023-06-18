import * as nftCtrl from "../controllers/user/nft"
const express = require("express");
const routerNft = express.Router();
import { auth_user } from "../middlerware/jwt";
import * as slugs from"../utils/slugs"
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/nftImage');
    },
    filename: function(req, file, cb) {
        //console.log("midleware...", req);
        cb(null, file.originalname.replace(/\\/g, "/"));
    }

});

let uploadImage = multer({ storage: storage }).single('nft_images');




routerNft.post(slugs.SLUGS_CREATE_NFT,auth_user, uploadImage,nftCtrl.createNft);

module.exports=routerNft;