import mongoose from "mongoose";

import * as constantsKeys from "../utils/constantsKey";

const Schema = mongoose.Schema;

let categorySchema = new Schema(
    {
        [constantsKeys.KEY_NAME]:{
            type:String,
        },
        [constantsKeys.KEY_STATUS]:{
            type:Number,
            default:1
        },

        [constantsKeys.KEY_IS_DELETED]:{
            type:Number,
            default:0
        }


    },
    {timestamps:true}
);

export default mongoose.model('category',categorySchema);