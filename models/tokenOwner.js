import mongoose from "mongoose";

//import * as ConstCollectionRefs from "../utils/ConstCollectionRefs";
import * as constantsKeys from "../utils/constantsKey";
import {KEY_REMAINING_FRACTION} from "../utils/constantsKey";

const Schema = mongoose.Schema;

let tokenOwnerSchema = new Schema(
    {

        [constantsKeys.KEY_TYPE]: {
            type: String,
        },
        [constantsKeys.KEY_PRICE]: {
            type: Number,
            default:0,

        },
        [constantsKeys.KEY_AMOUNT]: {
            type: Number,
            default:0,
        },
        [constantsKeys.KEY_FRACTION_AMOUNT]: {
            type: Number,
            default:0,
        },
        [constantsKeys.KEY_PER_FRACTION_PRICE]: {
            type: Number,
            default:0,
        },
        [constantsKeys.KEY_REMAINING_FRACTION]: {
            type: Number,
            default:0,
        },
        // [constantsKeys.KEY_CURRENCY]:{//currency
        //     type:String,
        // },
        // [constantsKeys.KEY_METPROPS_FEES]:{
        //     type:String,
        // },
        // [constantsKeys.KEY_FUTURE_ROYALITY]:{
        //     type:String,
        // },
        // [constantsKeys.KEY_IS_PRIVATE]:{
        //     type:Number,
        //     default:0
        // },
        // [constantsKeys.KEY_PRIVATE_ADDRESS]:{
        //     type:[String],
        // },
        // [constantsKeys.KEY_DURATION]:{
        //     type:String,
        // },
        // [constantsKeys.KEY_START_DATE]:{
        //     type:String,
        //     default:Date.now()
        // },
        // [constantsKeys.KEY_END_DATE]:{
        //     type:String,
        //     default:Date.now()
        // },
        [constantsKeys.KEY_TOKEN_ID]:{
            type:Schema.Types.ObjectId,
        },
        [constantsKeys.KEY_TOKEN_COUNT]:{
            type:Number,
        },
        [constantsKeys.KEY_TOKEN_QUANTITY]:{
            type:Number,
            default:0,
        },
        // [constantsKeys.KEY_TOKEN_BALANCE]:{
        //     type:Number,
        //     default:0,
        // },
        // [constantsKeys.KEY_BURN_STATUS]:{
        //     type:Number,
        //     default:0,
        //
        // },
        // [constantsKeys.KEY_IPFS_URI]:{
        //     type:String,
        //
        // },
        [constantsKeys.KEY_ON_SALE]:{
            type:Number,

        },
        [constantsKeys.KEY_SOLD]:{
            type:Number,
            default:0,

        },
       /* [constantsKeys.KEY_CURRENCY]:{
            type:String,
        },
        [constantsKeys.KEY_CONTRACT_ADDR]:{
            type:String,
            default:process.env.contractAddress
        },*/
        [constantsKeys.KEY_HASH_VALUE]:{
            type:String,
            default:"",
        },
        [constantsKeys.KEY_CREATOR_ADDRESS]:{
            type:String,
            default:"",
        },
        // [constantsKeys.KEY_SIGNATURE]:{
        //     type:mongoose.Schema.Types.Mixed,
        //
        // },
        [constantsKeys.KEY_OWNER_ADDRESS]:{
            type:String,
            default:"",
        },
        [constantsKeys.KEY_ON_SALE_PERCENT]:{
            type:Number,
            default:"",
        },
        [constantsKeys.KEY_ON_SALE_FRACTIONS]:{
            type:Number,
            default:0,
        },
        [constantsKeys.KEY_FIXED]:{
            type:Number,
            default:0,
        },
        [constantsKeys.KEY_AUCTION]:{
            type:Number,
            default:0,
        },
        [constantsKeys.KEY_AUCTION_DATE]: {
            type: Date,
            default: Date.now
        }
        // [constantsKeys.KEY_HASH_VALUE]:{
        //     type:String,
        //     default:"",
        // },
//signature-string creator_addr owner_addr

    },
    {
        collection: "tokenOwner",
        timestamps: true,
        strict: true,
        versionKey: false,
    }
);

export default mongoose.model("tokenOwner", tokenOwnerSchema);
