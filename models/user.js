import mongoose from 'mongoose';
import * as constantsKeys from "../utils/constantsKey";
import {KEY_LINK} from "../utils/constantsKey";
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({

        [constantsKeys.KEY_NAME]: {
            type: String,
            default: "",
        },
        [constantsKeys.KEY_WALLET_STATUS]:{
            type:Number,
            default:1,
        },
        [constantsKeys.KEY_PHONE_NO]: {
            type: String,
            default:"",

        },
        [constantsKeys.KEY_ROLE]:{
            type: String,
            default:"",
        },
        [constantsKeys.KEY_OCCUPATION]:{
            type:String,
            default:"",
        },
        [constantsKeys.KEY_EMAIL]: {
            type: String,
            // required: true
        },
        [constantsKeys.KEY_DISPLAY_PICTURE]:{
            type: String,
            default: "",
        },
        [constantsKeys.KEY_COVER_PICTURE]:{
            type: String,
            default: "",
        },
        [constantsKeys.KEY_WALLET_ADDRESS]:{
            type: String,
            default: "",
        },


        [constantsKeys.KEY_STATUS]:{
            type:Number,
            default:1   // 0 false 1 true
        },
        [constantsKeys.KEY_DATE_OF_BIRTH]:{
            type:String,
            default:""  // 0 false 1 true
        },

        [constantsKeys.KEY_BIO]:{
            type:String,
            default:""
        },

        [constantsKeys.KEY_LINK]:{
            type:String,
            default:""
        },

        [constantsKeys.KEY_DELETED] : {
            type: Number,
            default: 0, // 1 Active 0 Deleted
        },

    },
    {timestamps:true},

);
module.exports  = mongoose.model( "user",UserSchema);