import mongoose from "mongoose";

import * as constantsKeys from "../utils/constantsKey";

const Schema = mongoose.Schema;

let tokenCollectionSchema = new Schema(
    {

        [constantsKeys.KEY_TOKEN_ID]: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'nft',
        },
        [constantsKeys.KEY_COLLECTION_ID]:{
            type: mongoose.Schema.Types.ObjectId,


        }


    },
    {
        collection: 'tokenCollection',
        timestamps: true,
        strict: true,
        versionKey: false,
    }
);

export default mongoose.model("tokenCollection", tokenCollectionSchema);
