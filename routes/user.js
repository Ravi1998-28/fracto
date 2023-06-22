import * as userCtrl from "../controllers/user/user"
import * as walletCtrl from "../controllers/user/wallet"
const express = require("express");
const routerUser = express.Router();
//import { auth_user } from "../../middleware/jwt";
import * as slugs from"../utils/slugs"
import {Role} from "../controllers/user/user";
import { auth_user } from "../middlerware/jwt";
import {SLUG_GET_USER_PROFILE} from "../utils/slugs";

const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/userImage');
    },
    filename: function(req, file, cb) {
        //console.log("midleware...", req);
        cb(null, file.originalname.replace(/\\/g, "/"));
    }

});

let uploadImage = multer({ storage: storage }).single('display_picture');

routerUser.post(slugs.SLUG_ADD_USERS, walletCtrl.addWallet);
routerUser.post(slugs.SLUG_ADD_ROLE, userCtrl.addRoles);
routerUser.get(slugs.SLUG_ROLE, userCtrl.Role);
routerUser.get(slugs.SLUG_LIST_ALL_USERS,auth_user, userCtrl.listOfUsers);
routerUser.get(slugs.SLUG_GET_USER_PROFILE,auth_user, userCtrl.getProfile);
routerUser.put(slugs.SLUG_EDIT_USER_PROFILE,auth_user,uploadImage, userCtrl.updateProfile);

module.exports=routerUser;




//module.exports=routerUser;