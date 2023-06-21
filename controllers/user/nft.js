import user from '../../models/user';
import nft from '../../models/nft'
import category from '../../models/category'
import * as constantsKeys from "../../utils/constantsKey";

export let createNft = async (req, res) => {
    try {
        let where = {
            _id: req.user._id,
        };
        let adminData = await user.findOne(where);
        if(adminData.role === 'admin'){
            let file = "";
            if (req.file && req.file.filename) {
                file = req.file.filename;
            }

            function getRandom(length) {
                return Math.floor(
                    Math.pow(10, length - 1) +
                    Math.random() * 9 * Math.pow(10, length - 1)
                );
            }
            var matches = new Date().getTime().toString();
            let numbers = matches.slice(matches.length - 5);

            let number = getRandom(5).toString();
            console.log(number);
            const tokenCount = number + numbers;

            let nftData = {
                [constantsKeys.KEY_USER_ID]: req.user._id,
                [constantsKeys.KEY_CATEGORY_ID]: req.body.category_id,
                [constantsKeys.KEY_NFT_IMAGES]: file,
                [constantsKeys.KEY_NFT_NAME]: req.body[constantsKeys.KEY_NFT_NAME],
                [constantsKeys.KEY_EXTERNAL_LINK]:
                    req.body[constantsKeys.KEY_EXTERNAL_LINK],
                [constantsKeys.KEY_COMPLETION_STATUS]:
                    req.body[constantsKeys.KEY_COMPLETION_STATUS],
                [constantsKeys.KEY_LICENCE_TYPE]:
                    req.body[constantsKeys.KEY_LICENCE_TYPE],
                [constantsKeys.KEY_CONSTRUCTION_STATUS]:
                    req.body[constantsKeys.KEY_CONSTRUCTION_STATUS],
                [constantsKeys.KEY_BLOCKCHAIN]: req.body[constantsKeys.KEY_BLOCKCHAIN],
                [constantsKeys.KEY_TOKEN_ID]: req.body[constantsKeys.KEY_TOKEN_ID],
                [constantsKeys.KEY_TOKEN_COUNT]: Number(tokenCount),
                [constantsKeys.KEY_CREATOR_ADDRESS]:
                    req.body[constantsKeys.KEY_OWNER_ADDRESS],
                // [constantsKeys.KEY_PRICE]: req.body[constantsKeys.KEY_PRICE],
                [constantsKeys.KEY_DESCRIPTION]:
                    req.body[constantsKeys.KEY_DESCRIPTION],
                [constantsKeys.KEY_PROPERTY_TYPE]:
                    req.body[constantsKeys.KEY_PROPERTY_TYPE],
                [constantsKeys.KEY_IMFORMATION_TYPE]:
                    req.body[constantsKeys.KEY_IMFORMATION_TYPE],
            };

            let nftDataRes = await nft.create(nftData)
            console.log("nftDataRes", nftDataRes);
            return res.status(200).json({
                success: true,
                message: "NFT created successfully",
                data: nftDataRes,
            });
        }else {
            return res.status(200).json({
                success: false,
                message: "You are not authorised to create nft.",
            })
        }



    } catch (e) {
        console.log("there are ", e);
        return res
            .status(500)
            .json({ success: false, message: "There are some error", e });
    }
};

export let listNft = async (req, res) => {
    try {
        let nftDataRes = await nft.find();
        return res.status(200).json({
            success: true,
            message: "List of nft",
            data: nftDataRes,
        })
    } catch (e) {
        console.log("there are ", e);
        return res
            .status(500)
            .json({ success: false, message: "There are some error", e });
    }
};

export let nftDetails = async (req, res) => {
    try {
        let nftDataRes = await nft.findOne({_id:req.query.id});
        return res.status(200).json({
            success: true,
            message: "nft data.",
            data: nftDataRes,
        })
    } catch (e) {
        console.log("there are ", e);
        return res
            .status(500)
            .json({ success: false, message: "There are some error", e });
    }
};

export let createCategory = async (req, res) => {
    try {
        let data = {
            name : req.body.name
        }
        let categData = await category.create(data);
        return res.status(200).json({
            success: true,
            message: "Category created successfully.",
            data: categData,
        })
    } catch (e) {
        console.log("there are ", e);
        return res
            .status(500)
            .json({ success: false, message: "There are some error", e });
    }
};

export let listCategory = async (req, res) => {
    try {
        let categData = await category.find();
        return res.status(200).json({
            success: true,
            message: "list of Categories.",
            data: categData,
        })
    } catch (e) {
        console.log("there are ", e);
        return res
            .status(500)
            .json({ success: false, message: "There are some error", e });
    }
};

// export let listNft = async (req, res) => {
//     try {
//         let nftDataRes = await nft.find();
//         return res.status(200).json({
//             success: true,
//             message: "NFT created successfully",
//             data: nftDataRes,
//         })
//     } catch (e) {
//         console.log("there are ", e);
//         return res
//             .status(500)
//             .json({ success: false, message: "There are some error", e });
//     }
// };