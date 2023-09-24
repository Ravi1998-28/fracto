import mongoose from "mongoose";

//import * as ConstCollectionRefs from "../utils/ConstCollectionRefs";
import * as constantsKeys from "../utils/constantsKey";
import {KEY_REMAINING_FRACTION, KEY_SELL_GAS_PRICE} from "../utils/constantsKey";

const Schema = mongoose.Schema;

let nftPriceSchema = new Schema(
    {
        [constantsKeys.KEY_TOKEN_ID]: {
            type: Schema.Types.ObjectId,
        },
        [constantsKeys.KEY_SELL_GAS_PRICE]: {
            type: Number,
            default:0,
        },
        [constantsKeys.KEY_MIN_GAS_PRICE]: {
            type: Number,
            default:0,

        },
    },
    {
        collection: "nftPrice",
        timestamps: true,
        strict: true,
        versionKey: false,
    }
);

export default mongoose.model("nftPrice", nftPriceSchema);
