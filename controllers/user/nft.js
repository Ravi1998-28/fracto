import user from '../../models/user';
import nft from '../../models/nft'
import category from '../../models/category'
import tokenCollection from '../../models/tokenCollection';
import TokenOwner from '../../models/tokenOwner';
import purchaseFraction from '../../models/purchaseFraction';
import * as constantsKeys from "../../utils/constantsKey";
import bannerModel from '../../models/bannerNft';
let  ObjectId = require("mongodb").ObjectId;

export let createNft = async (req, res) => {
    try {
        let where = {
            _id: req.user._id,
        };
        let adminData = await user.findOne(where);
        if(adminData.role === 'admin' || adminData.role === 'creator'){
            // let file = "";
            // if (req.file && req.file.filename) {
            //     file = req.file.filename;
            // }

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
            let images = []
            let array = req.files.nft_media?.forEach((el) => {
                images.push(el.location);
            });
            let nftData = {
                [constantsKeys.KEY_USER_ID]: req.user._id,
                [constantsKeys.KEY_CATEGORY_ID]: req.body.category_id,
                [constantsKeys.KEY_NFT_IMAGES]: images,
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
        let nftDataRes = await nft.aggregate(
            [
                {

                    $lookup: {
                        from: "tokenOwner",
                        localField: "_id",
                        foreignField: "token_id",
                        as: "token_owner",
                    },
                },
                {
                    $unwind: {
                        path: "$" + "token_owner",
                        preserveNullAndEmptyArrays: true,
                    },

                },
        ]);
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
        let nftDataRes = await nft.aggregate([
            {
                $match: {
                    _id: new ObjectId(req.query.id),
                    // is_deleted: 0,
                    // status: 1
                },
            },

            {

                $lookup: {
                    from: "tokenOwner",
                    localField: "_id",
                    foreignField: "token_id",
                    as: "token_owner",
                },
            },
            {
                $unwind: {
                    path: "$" + "token_owner",
                    preserveNullAndEmptyArrays: true,
                },

            },
            {

                $lookup: {
                    from: "tokenCollection",
                    localField: "_id",
                    foreignField: "token_id",
                    as: "token_collection",
                },
            },
            {
                $unwind: {
                    path: "$" + "token_collection",
                    preserveNullAndEmptyArrays: true,
                },

            },
            {

                $lookup: {
                    from: "collections",
                    localField: "token_collection.collection_id",
                    foreignField: "_id",
                    as: "collection",
                },
            },
            {
                $unwind: {
                    path: "$" + "collection",
                    preserveNullAndEmptyArrays: true,
                },

            },
        ]);                               //findOne({_id:req.query.id});

        return res.status(200).json({
            success: true,
            message: "nft data.",
            data: nftDataRes[0],
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
            tokenCheck[constantsKeys.KEY_ON_SALE_PERCENT] = req.body[constantsKeys.KEY_ON_SALE_PERCENT]
            tokenCheck[constantsKeys.KEY_ON_SALE_FRACTIONS] = Math.round((req.body[constantsKeys.KEY_ON_SALE_PERCENT]/100)*req.body[constantsKeys.KEY_FRACTION_AMOUNT])
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
                [constantsKeys.KEY_REMAINING_FRACTION] : req.body[constantsKeys.KEY_FRACTION_AMOUNT],
                [constantsKeys.KEY_ON_SALE]: 1,
                [constantsKeys.KEY_TOKEN_ID]: tokenData[constantsKeys.KEY_UNDERSCOR_ID],
                [constantsKeys.KEY_HASH_VALUE]: req.body[constantsKeys.KEY_HASH_VALUE],
                [constantsKeys.KEY_ON_SALE_PERCENT]: req.body[constantsKeys.KEY_ON_SALE_PERCENT],
                [constantsKeys.KEY_ON_SALE_FRACTIONS] : Math.round((req.body[constantsKeys.KEY_ON_SALE_PERCENT]/100)*req.body[constantsKeys.KEY_FRACTION_AMOUNT])
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
export const onSale = async (req, res) => {
    try {


        let obj = { "token_owner.on_sale": 1 }



        let where = [

            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: constantsKeys.KEY_UNDERSCOR_ID,
                    as: "user_data",
                },
            },
            {
                $unwind: {
                    path: "$" + "user_data",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    "from": 'tokenOwner',
                    "localField": '_id',
                    "foreignField": "token_id",
                    "as": 'token_owner'
                }
            },
            {
                $unwind: {
                    path: "$" + "token_owner",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match:obj
            },

        ];

        const data = await nft.aggregate(where);

        return res.status(200).json({
            success: true,
            data: data,

        })

    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export let purchaseNft = async (req, res) => {
    console.log("heyyy");
    try {
        const tokenData = await TokenOwner.findOne({ token_id: new ObjectId(req.body.token_id), on_sale: 1 });
        console.log(tokenData);
        if (tokenData) {
            console.log("inside")
            await purchaseFraction.create({
                user_id:req.user._id,
                token_id:req.body.token_id,
                fraction_amount:req.body.fractionPurchase,
                amount:req.body.amount
            })
            tokenData.remaining_fraction = tokenData.remaining_fraction - req.body.fractionPurchase;
            if(tokenData.fraction_amount == 0){
                tokenData.on_sale = 0;
                tokenData.sold = 1;
            }

            await tokenData.save();
        } else {
            return res
                .status(200)
                .json({
                    success: false,
                    message: "This NFT not on sale.",
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                message: "you have successfully purchased Nft",
            });

    } catch (e) {
        console.log("there are ", e);
        return res
            .status(500)
            .json({ success: false, message: "There are some error", e });
    }
};

export let listAllNftOnSaleUser = async (req, res) => {
    try {
        console.log("fff dfsdffsfdsfds",req.user._id)
        const tokenData = await purchaseFraction.aggregate([{
           $match: { user_id: new ObjectId(req.query.user_id) }
        },
            {
                $lookup: {
                    from: "nfts",
                    localField: "token_id",
                    foreignField: "_id",
                    as: "nft-data",
                },
            },
            {
                $unwind: {
                    path: "$" + "nft-data",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {

                $lookup: {
                    from: "tokenOwner",
                    localField: "token_id",
                    foreignField: "token_id",
                    as: "token_owner",
                },
            },
            {
                $unwind: {
                    path: "$" + "token_owner",
                    preserveNullAndEmptyArrays: true,
                },

            },

            {

                $lookup: {
                    from: "tokenCollection",
                    localField: "token_id",
                    foreignField: "token_id",
                    as: "token_collection",
                },
            },
            {
                $unwind: {
                    path: "$" + "token_collection",
                    preserveNullAndEmptyArrays: true,
                },

            },
            {

                $lookup: {
                    from: "collections",
                    localField: "token_collection.collection_id",
                    foreignField: "_id",
                    as: "collection",
                },
            },
            {
                $unwind: {
                    path: "$" + "collection",
                    preserveNullAndEmptyArrays: true,
                },

            },

        ]);

        return res
            .status(200)
            .json({
                success: true,
                data: tokenData,
            });

    } catch (e) {
        console.log("there are ", e);
        return res
            .status(500)
            .json({ success: false, message: "There are some error", e });
    }
};

export let listCreatorAllNft = async (req, res) => {
    try {
        console.log("fff",req.user._id)
        const nftData = await  nft.aggregate([
            {
            $match:{user_id:new ObjectId(req.user._id)}
        }
        ])

        return res
            .status(200)
            .json({
                success: true,
                data: nftData,
            });

    } catch (e) {
        console.log("there are ", e);
        return res
            .status(500)
            .json({ success: false, message: "There are some error", e });
    }
};

export let listCreatorOnSaleAllNft = async (req, res) => {
    try {
        console.log("fff",req.user._id)
        let nftData = await TokenOwner.aggregate([
            {
                $lookup: {
                    from: "nfts",
                    localField: "token_id",
                    foreignField: "_id",
                    as: "nft-data",
                },
            },
            {
                $unwind: {
                    path: "$" + "nft-data",
                    preserveNullAndEmptyArrays: true,
                },

            },
            {
                $match:{'nft-data.user_id':new ObjectId(req.user._id)}
            }
        ])
        return res
            .status(200)
            .json({
                success: true,
                data: nftData,
            });

    } catch (e) {
        console.log("there are ", e);
        return res
            .status(500)
            .json({ success: false, message: "There are some error", e });
    }
};

export const addBannerNft = async (req, res) => {
    try {
        var data =
            {
                [constantsKeys.KEY_TOKEN_ID]: req.body.id
            }
        let dataBanner  = await bannerModel.findOneAndUpdate({}, data);
         if(!dataBanner) { await bannerModel.create(data);}
        await nft.findOneAndUpdate({ _id: new ObjectId(req.body.id) }, { [constantsKeys.KEY_BANNER_STATUS]: 1 });
        await nft.updateMany({ _id: { $ne: new ObjectId(req.body.id) } }, { $set: { [constantsKeys.KEY_BANNER_STATUS]: 0 } });

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Nft added succesfully",
        });



    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getBannerNft = async (req, res) => {
    try {
        const bannerData = await bannerModel.aggregate([

            {
                $lookup: {
                    "from": 'nfts',
                    "localField": 'token_id',
                    "foreignField": constantsKeys.KEY_UNDERSCOR_ID,
                    "as": 'nft_data'
                }
            },
            {
                $unwind: {
                    path: "$" + 'nft_data',
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $lookup: {
                    "from": 'tokenOwner',
                    "localField": 'nft_data.token_count',
                    "foreignField": "token_count",
                    "as": 'token_owner'
                }
            },

            {
                $unwind: {
                    path: "$" + 'token_owner',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    token_id: 1,
                    nft_data: "$nft_data",
                    token_owner: {
                        $cond: {
                            if: { $eq: ["$token_owner.on_sale", 1] }, then: "$token_owner",
                            else: ""
                        }
                    }
                }


            }
            // {$match:{
            //   "$or": [
            //     { "token_owner.on_sale": 1 },


            //   ]
            // }}


        ]);



        return res.status(200).json({
            status: 200,
            success: true,
            data: bannerData,
        });



    } catch (error) {
        console.log("there are ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};