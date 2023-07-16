import user from '../../models/user';
import nft from '../../models/nft'
import category from '../../models/category'
import tokenCollection from '../../models/tokenCollection';
import TokenOwner from '../../models/tokenOwner';
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
                [constantsKeys.KEY_TRANSACTION_ID]:
                    req.body[constantsKeys.KEY_TRANSACTION_ID],
            };

            let nftDataRes = await nft.create(nftData);

            //Add nft in collection
            let collection_id = req.body.collection_id;
            await tokenCollection.create({token_id:nftDataRes?._id,collection_id:collection_id})

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

export let saleNFT = async (req, res) => {

    try {
        const tokenData = await nft.findById(req.body.id);

        const tokenCheck = await TokenOwner.findOne({ [constantsKeys.KEY_TOKEN_ID]: req.body.id });
        if (tokenCheck) {
            console.log("inside again on sale");
            tokenCheck.on_sale = 1;
            tokenCheck.sold = 0;
            //tokenCheck.ipfs_uri = req.body.ipfsUri;
            tokenCheck.price = req.body[constantsKeys.KEY_PRICE];
            tokenCheck[constantsKeys.KEY_AMOUNT] = req.body[constantsKeys.KEY_AMOUNT];
            tokenCheck[constantsKeys.KEY_FRACTION_AMOUNT] = req.body[constantsKeys.KEY_FRACTION_AMOUNT];
            tokenCheck[constantsKeys.KEY_PER_FRACTION_PRICE] = req.body[constantsKeys.KEY_PER_FRACTION_PRICE];
            // tokenCheck[constantsKeys.KEY_METPROPS_FEES] = req.body[constantsKeys.KEY_METPROPS_FEES];
            // tokenCheck[constantsKeys.KEY_FUTURE_ROYALITY] = req.body[constantsKeys.KEY_FUTURE_ROYALITY];
            // if (req.body[constantsKeys.KEY_IS_PRIVATE]) {
            //     tokenCheck[constantsKeys.KEY_IS_PRIVATE] = req.body[constantsKeys.KEY_IS_PRIVATE];
            // }
            // tokenCheck[constantsKeys.KEY_CURRENCY] = req.body[constantsKeys.KEY_CURRENCY];
            // tokenCheck[constantsKeys.KEY_DURATION] = req.body[constantsKeys.KEY_DURATION];
            // tokenCheck[constantsKeys.KEY_START_DATE] = req.body[constantsKeys.KEY_START_DATE];
            // tokenCheck[constantsKeys.KEY_END_DATE] = req.body[constantsKeys.KEY_END_DATE];
            // if (req.body[constantsKeys.KEY_PRIVATE_ADDRESS]) {
            //     tokenCheck[constantsKeys.KEY_PRIVATE_ADDRESS] = req.body[constantsKeys.KEY_PRIVATE_ADDRESS];
            // }
            // tokenCheck[constantsKeys.KEY_TYPE] = req.body[constantsKeys.KEY_TYPE];
            // tokenCheck[constantsKeys.KEY_HASH_VALUE] = req.body[constantsKeys.KEY_HASH_VALUE];
            // tokenCheck[constantsKeys.KEY_CONTRACT_ADDR] = req.body[constantsKeys.KEY_CONTRACT_ADDR];
            // tokenCheck[constantsKeys.KEY_SIGNATURE] = req.body[constantsKeys.KEY_SIGNATURE];
            // tokenCheck[constantsKeys.KEY_CURRENCY] = req.body[constantsKeys.KEY_CURRENCY];
            // tokenCheck[constantsKeys.KEY_TOKEN_BALANCE] = req.body[constantsKeys.KEY_TOKEN_BALANCE];
            // tokenCheck[constantsKeys.KEY_TOKEN_QUANTITY] = req.body[constantsKeys.KEY_TOKEN_QUANTITY];
            // tokenCheck[constantsKeys.KEY_CREATOR_ADDRESS] = req.body[constantsKeys.KEY_CREATOR_ADDRESS];
            // tokenCheck[constantsKeys.KEY_OWNER_ADDRESS] = req.body[constantsKeys.KEY_CREATOR_ADDRESS];
            tokenCheck.save();
        } else {
            let creatorData = await new TokenOwner({
                [constantsKeys.KEY_PRICE]: req.body[constantsKeys.KEY_PRICE],
                [constantsKeys.KEY_AMOUNT] : req.body[constantsKeys.KEY_AMOUNT],
                [constantsKeys.KEY_PER_FRACTION_PRICE] : req.body[constantsKeys.KEY_PER_FRACTION_PRICE],
                [constantsKeys.KEY_FRACTION_AMOUNT] : req.body[constantsKeys.KEY_FRACTION_AMOUNT],
                [constantsKeys.KEY_ON_SALE]: 1,
                [constantsKeys.KEY_TOKEN_ID]: tokenData[constantsKeys.KEY_UNDERSCOR_ID],
                [constantsKeys.KEY_HASH_VALUE]: req.body[constantsKeys.KEY_HASH_VALUE],
                // [constantsKeys.KEY_METPROPS_FEES]:
                //     req.body[constantsKeys.KEY_METPROPS_FEES],
                // [constantsKeys.KEY_FUTURE_ROYALITY]:
                //     req.body[constantsKeys.KEY_FUTURE_ROYALITY],
                // [constantsKeys.KEY_IS_PRIVATE]: req.body[constantsKeys.KEY_IS_PRIVATE],
                // [constantsKeys.KEY_CURRENCY]: req.body[constantsKeys.KEY_CURRENCY],
                // [constantsKeys.KEY_DURATION]: req.body[constantsKeys.KEY_DURATION],
                // [constantsKeys.KEY_START_DATE]: req.body[constantsKeys.KEY_START_DATE],
                // [constantsKeys.KEY_END_DATE]: req.body[constantsKeys.KEY_END_DATE],
                // [constantsKeys.KEY_PRIVATE_ADDRESS]:
                //     req.body[constantsKeys.KEY_PRIVATE_ADDRESS],
                // [constantsKeys.KEY_IPFS_URI]: req.body.ipfsUri,

                // [constantsKeys.KEY_TYPE]: req.body[constantsKeys.KEY_TYPE],
                // [constantsKeys.KEY_TOKEN_COUNT]:
                //     tokenData[constantsKeys.KEY_TOKEN_COUNT],
                // [constantsKeys.KEY_CONTRACT_ADDR]:
                //     req.body[constantsKeys.KEY_CONTRACT_ADDR],
                // [constantsKeys.KEY_SIGNATURE]: req.body[constantsKeys.KEY_SIGNATURE],
                // [constantsKeys.KEY_CURRENCY]: req.body[constantsKeys.KEY_CURRENCY],
                // [constantsKeys.KEY_TOKEN_BALANCE]:
                //     req.body[constantsKeys.KEY_TOKEN_BALANCE],
                // [constantsKeys.KEY_TOKEN_QUANTITY]:
                //     req.body[constantsKeys.KEY_TOKEN_QUANTITY],
                // [constantsKeys.KEY_CREATOR_ADDRESS]:
                //     req.body[constantsKeys.KEY_CREATOR_ADDRESS],
                // [constantsKeys.KEY_OWNER_ADDRESS]:
                //     req.body[constantsKeys.KEY_CREATOR_ADDRESS],

            });


            await creatorData.save();
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "you have successfully added your nft onsale",
            });

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