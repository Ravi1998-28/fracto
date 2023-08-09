import * as cmsCtrl from "../controllers/user/cms"
const express = require("express");
const routerCms = express.Router();
import { auth_user } from "../middlerware/jwt";
import * as slugs from"../utils/slugs"



routerCms.put(slugs.SLUG_ADD_TERMS_AND_CONDITION, cmsCtrl.addTermsAndCondition)
routerCms.get(slugs.SLUG_GET_TERMS_AND_CONDITION, cmsCtrl.getTermsAndCondition)
routerCms.put(slugs.SLUG_ADD_PRIVACY_POLICY,cmsCtrl.addPrivacyPolicy)
routerCms.get(slugs.SLUG_GET_PRIVACY_POLICY, cmsCtrl.getPrivacyPolicy)
routerCms.put(slugs.SLUG_ADD_HELP_AND_GUIDANCE,cmsCtrl.addHelpAndGuidance)
routerCms.get(slugs.SLUG_GET_HELP_AND_GUIDANCE, cmsCtrl.getHelpAndGuidance)

module.exports=routerCms;