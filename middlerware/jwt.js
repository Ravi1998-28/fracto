import { model } from "mongoose";

import * as constantsKeys from "../utils/constantsKey";
import jwt from "jsonwebtoken";
let BadRequestResponse ={};
export const auth_user = async(req, res, next)=> {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, "iAmUserAccessSecret", async (err, user_deatils) => {
        console.log(err)
        if (err)  return res.status(400).json({success:false,message:"Token Expired"}).end();




        req.user = user_deatils;
        next();



    });
}


//model.exports = { auth, auth_admin };
export default {auth_user };
