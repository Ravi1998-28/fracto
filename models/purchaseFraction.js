import mongoose from "mongoose";

//import * as ConstCollectionRefs from "../utils/ConstCollectionRefs";
import * as constantsKeys from "../utils/constantsKey";
import {KEY_REMAINING_FRACTION} from "../utils/constantsKey";

const Schema = mongoose.Schema;

let purchaseFractionSchema = new Schema(
    {

        [constantsKeys.KEY_USER_ID]: {
            type: String,
        },
        [constantsKeys.KEY_TOKEN_ID]: {
            type: String,
        },
        [constantsKeys.KEY_FRACTION_AMOUNT]: {
            type: Number,
            default:0,
        },
        [constantsKeys.KEY_AMOUNT]: {
            type: Number,
            default:0,

        },
    },
    {
        collection: "purchaseFraction",
        timestamps: true,
        strict: true,
        versionKey: false,
    }
);

export default mongoose.model("purchaseFraction", purchaseFractionSchema);
