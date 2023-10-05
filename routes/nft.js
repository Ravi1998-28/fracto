import * as nftCtrl from "../controllers/user/nft"
const express = require("express");
const routerNft = express.Router();
import { auth_user } from "../middlerware/jwt";
import * as slugs from"../utils/slugs"
import {nftDetails} from "../controllers/user/nft";
import {SLUG_ADD_NFT_price, SLUG_GET_BANNER_NFT, SLUG_GET_LIST_NFT_PRICE, SLUG_ON_SALE} from "../utils/slugs";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
const multer = require('multer');

////Aws

AWS.config.update({
    accessKeyId: "AKIAXKR6HGL43IRJMY76",
    secretAccessKey: "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",
});
let s3 = new AWS.S3();

//const storage = multer.memoryStorage();

//  uploding image via multer and S3
const uploadsBusinessGallery = multer({
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
    { name: "nft_media" },
    { name: "nft_zip_files" },
    { name: "preview_image" },
    { name: "video" },
]);

////end Aws





let storage1 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/nftImage');
    },
    filename: function(req, file, cb) {
        //console.log("midleware...", req);
        cb(null, file.originalname.replace(/\\/g, "/"));
    }

});

let uploadImage = multer({ storage: storage1 }).single('nft_images');

routerNft.post(slugs.SLUGS_CREATE_NFT,auth_user, uploadsBusinessGallery,nftCtrl.createNft);
routerNft.get("/listNft",nftCtrl.listNft);
routerNft.post("/category",auth_user,nftCtrl.createCategory);
routerNft.get("/listOfCategories",auth_user,nftCtrl.listCategory);
routerNft.get(slugs.SLUGS_GET_NFT,nftCtrl.nftDetails);
routerNft.post(slugs.SLUGS_SALE_NFT,auth_user,nftCtrl.saleNFT);
routerNft.get(slugs.SLUG_ON_SALE,nftCtrl.onSale);
routerNft.post(slugs.SLUGS_PURCHASE_NFT,auth_user,nftCtrl.purchaseNft);
routerNft.get("/listAllUserNftOnSale",auth_user,nftCtrl.listAllNftOnSaleUser);
routerNft.get("/listCreatorAllNft",auth_user,nftCtrl.listCreatorAllNft);
routerNft.get("/listCreatorOnSaleAllNft",auth_user,nftCtrl.listCreatorOnSaleAllNft);
routerNft.post(slugs.SLUG_ADD_BANNER_NFT,nftCtrl.addBannerNft);
routerNft.get(slugs.SLUG_GET_BANNER_NFT,nftCtrl.getBannerNft);
routerNft.post(slugs.SLUG_ADD_NFT_price,nftCtrl.addNftPrice);
routerNft.get(slugs.SLUG_GET_LIST_NFT_PRICE,nftCtrl.getListNftPrice);

module.exports=routerNft;