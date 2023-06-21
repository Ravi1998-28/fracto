import mongoose from "mongoose";

//import * as ConstCollectionRefs from "../utils/ConstCollectionRefs";
import * as constantsKeys from "../utils/constantsKey";
import {KEY_CATEGORY_ID} from "../utils/constantsKey";

const Schema = mongoose.Schema;

let nftSchema = new Schema(
    {
        [constantsKeys.KEY_USER_ID]: {
            type: mongoose.Schema.Types.ObjectId,
        },
        [constantsKeys.KEY_CATEGORY_ID]: {
            type: mongoose.Schema.Types.ObjectId,
        },
        [constantsKeys.KEY_NFT_IMAGES]: {
            type: [String],
            default: ""
        },

        [constantsKeys.KEY_IS_DELETED]: {
            type: Number,
            default: 0
        },

        [constantsKeys.KEY_PREVIEW_IMAGE]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_TYPOLOGY]: {
            type: [String],

        },
        [constantsKeys.KEY_NFT_ZIP_FILE]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_NFT_NAME]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_EXTERNAL_LINK]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_COMPLETION_STATUS]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_TAGS]: {
            type: [String],
            default: ""
        },
        [constantsKeys.KEY_LICENCE_TYPE]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_CONSTRUCTION_STATUS]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_BLOCKCHAIN]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_NETPROPS_FEES]: {
            type: String
        },
        [constantsKeys.KEY_DESCRIPTION]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_PROPERTY_TYPE]: {
            type: [String],
            default: undefined
        },
        [constantsKeys.KEY_DRAWING_FORMAT]: {
            type: [String],
            default: undefined
        },
        [constantsKeys.KEY_IMFORMATION_TYPE]: {
            type: String,
            default: undefined
        },


        [constantsKeys.KEY_TOKEN_ID]: {
            type: String,
            default: undefined

        },

        [constantsKeys.KEY_TOKEN_COUNT]: {
            type: Number,


        },
        [constantsKeys.KEY_CREATOR_ADDRESS]: {
            type: String,


        },
        [constantsKeys.KEY_TOKEN_QUANTITY]: {
            type: Number,


        },
        [constantsKeys.KEY_BURN_STATUS]: {
            type: Number,
            default: 0,

        },
        [constantsKeys.KEY_FEATURED]: {
            type: Number,
            default: 0


        },
        [constantsKeys.KEY_CUSTOM_PROPERTIES]: [Object],
        [constantsKeys.KEY_CONTRACT_ADDR]: {
            type: String,
            default: "0xb2de7d1f5d9a508ac9111621f300515967ce840e"

        },
        [constantsKeys.KEY_TOKEN_STATNDARD]: {
            type: String,
            default: "ERC-721"
        },
        [constantsKeys.KEY_META_DATA]: {
            type: String,
            default: ""
        },
        [constantsKeys.KEY_STATUS]: {
            type: Number,
            default: 1   // 0 false 1 true
        },
        [constantsKeys.KEY_BANNER_STATUS]: {
            type: Number,
            default: 0   // 0 tue 1 false
        },
        [constantsKeys.KEY_STATUS]: {
            type: Number,
            default: 1   // 0 false 1 true
        },
        [constantsKeys.KEY_BANNER_STATUS]: {
            type: Number,
            default: 0   // 0 tue 1 false
        },
        [constantsKeys.KEY_IS_LOCK]: {
            type: Number,
            default: 0,
        },
    },
    {

        timestamps: true,

    }
);

export default mongoose.model('nft', nftSchema)