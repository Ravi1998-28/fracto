import * as nftCtrl from "../controllers/user/nft"
const express = require("express");
const routerNft = express.Router();
import { auth_user } from "../middlerware/jwt";
import * as slugs from"../utils/slugs"
import {nftDetails} from "../controllers/user/nft";
import {SLUG_ON_SALE} from "../utils/slugs";
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
routerNft.get("/listNft",auth_user, uploadImage,nftCtrl.listNft);
routerNft.post("/category",auth_user,nftCtrl.createCategory);
routerNft.get("/listOfCategories",auth_user,nftCtrl.listCategory);
routerNft.get(slugs.SLUGS_GET_NFT,auth_user,nftCtrl.nftDetails);
routerNft.post(slugs.SLUGS_SALE_NFT,auth_user,nftCtrl.saleNFT);
routerNft.get(slugs.SLUG_ON_SALE,auth_user,nftCtrl.onSale);

module.exports=routerNft;