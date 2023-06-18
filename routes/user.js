import * as userCtrl from "../controllers/user/user"
import * as walletCtrl from "../controllers/user/wallet"
const express = require("express");
const routerUser = express.Router();
//import { auth_user } from "../../middleware/jwt";
import * as slugs from"../utils/slugs"
import {Role} from "../controllers/user/user";



routerUser.post(slugs.SLUG_ADD_USERS, walletCtrl.addWallet);
routerUser.post(slugs.SLUG_ADD_ROLE, userCtrl.addRoles);
routerUser.get(slugs.SLUG_ROLE, userCtrl.Role);

module.exports=routerUser;




//module.exports=routerUser;