import * as collectionCtrl from "../controllers/user/collection"
const express = require("express");
const routerCollec = express.Router();
import { auth_user } from "../middlerware/jwt";
import * as slugs from"../utils/slugs"
import {nftDetails} from "../controllers/user/nft";
import {SLUGS_COLLECTION, SLUGS_LIST_ALL_COLLECTIONS} from "../utils/slugs";
import {listNftInCollection} from "../controllers/user/collection";
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/collectionImage');
    },
    filename: function(req, file, cb) {
        //console.log("midleware...", req);
        cb(null, file.originalname.replace(/\\/g, "/"));
    }

});

let uploadImage = multer({ storage: storage }).single('image');

routerCollec.post(slugs.SLUGS_ADD_COLLECTION,auth_user, uploadImage,collectionCtrl.addCollectionAdmin);
routerCollec.get(slugs.SLUGS_LIST_ALL_COLLECTIONS,auth_user,collectionCtrl.listOfAllCollections);
routerCollec.get(slugs.SLUGS_COLLECTION,collectionCtrl.getCollection);
routerCollec.post('/editCollection',auth_user, uploadImage,collectionCtrl.editCollection);
routerCollec.get('/listNftInCollection',auth_user,collectionCtrl.listNftInCollection);

module.exports=routerCollec;