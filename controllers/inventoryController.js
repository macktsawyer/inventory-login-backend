const asyncHandler = require('express-async-handler');
const InventoryModel = require('../models/inventoryModel');
const { cloudinary } = require('../utils/cloudinary');
const uuid = require('uuid');

const newInventory = asyncHandler(async (req, res) => {
    try {
        const file_id = uuid.v4();
        const { item_name, item_desc, item_price } = req.body;
        const fileStr = req.body.image_data;
        if(!item_name || !item_desc || !item_price) {
            res.status(400)
            throw new Error('Please add all fields')
        }
        const uploadedResponse = await cloudinary.uploader.
        upload(fileStr, {
            folder: 'inv_lib_dump',
            public_id: file_id,
        })
        const itemInfo = InventoryModel.create({
            id: file_id,
            item: item_name,
            description: item_desc,
            price: item_price,
            image: fileStr
        })
        if (itemInfo) {
            res.status(201).json({
                id: itemInfo.id,
                item: itemInfo.item,
                msg: 'Upload successful'
            })
        } else {
            res.status(400)
            throw new Error('Item not submitted, error occured')
        }
        console.log(uploadedResponse)
    } catch (error) {
        console.error(error)
        res.json(500).json({err: 'Upload didnt work out well'})
    }
});

const getInventory = asyncHandler(async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:inv_lib_dump')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
    const publicIds = resources.map(file => file.public_id);
    res.send(publicIds);
})

// /inv/getInformation/:number
const getInformation = asyncHandler(async (req, res) => {
    const itemNumber = req.params.number;
    const itemInfo = await InventoryModel.findOne({itemNumber});
    res.status(200).json({
        id: itemInfo.id,
        item: itemInfo.item,
        description: itemInfo.description,
        price: itemInfo.price, 
    })
})

module.exports = {
    newInventory,
    getInventory,
    getInformation
}