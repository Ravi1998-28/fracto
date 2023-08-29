import mongoose from "mongoose";

import * as constantsKeys from "../utils/constantsKey";

const Schema = mongoose.Schema;

let bannerNftSchema = new Schema(
    {
        [constantsKeys.KEY_TOKEN_ID]:{
            type:Schema.Types.ObjectId,
        },


    },
    {timestamps:true}
);

export default mongoose.model('bannernft',bannerNftSchema);