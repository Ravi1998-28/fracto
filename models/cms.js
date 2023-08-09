import mongoose from "mongoose";

import * as constantsKeys from "../utils/constantsKey";

const Schema = mongoose.Schema;

let CMSschema = new Schema(
    {

        [constantsKeys.KEY_TERMS_CONDITIONS]: {
            type: String,
        },
        [constantsKeys.KEY_PRIVACY_POLICY]: {
            type: String,
        },
        [constantsKeys.KEY_HELP_AND_GUIDANCE]:{
            type:String,
        },

    },
    {
        collection: 'cms',
        timestamps: true,
        strict: true,
        versionKey: false,
    }
);

export default mongoose.model("cms", CMSschema);
