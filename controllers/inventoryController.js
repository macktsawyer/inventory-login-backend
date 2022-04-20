const asyncHandler = require('express-async-handler');
const InventoryModel = require('../models/inventoryModel');
const { cloudinary } = require('../utils/cloudinary');
const uuid = require('uuid');
const mongoose = require('mongoose');

// /inv/newInventory
// Desc: Create new inventory item
// Method: POST
const newInventory = asyncHandler(async (req, res) => {
    try {
        const file_id = uuid.v4();
        const mongoose_id = new mongoose.Types.ObjectId();
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
            publicId: `inv_lib_dump/${file_id}`,
            item: item_name,
            description: item_desc,
            price: item_price,
            image: fileStr,
            _id: mongoose_id
        })

        if (itemInfo) {
            res.send({ 
                description: req.body.item_desc, 
                id: file_id, 
                image: fileStr, 
                item: req.body.item_name, 
                price: req.body.item_price, 
                publicId: `inv_lib_dump/${file_id}`,
                _id: mongoose_id
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

// /inv/getInventory
// Desc: Get the inventory items
// Method: GET
const getInventory = asyncHandler(async (req, res) => {
    let idCode = [];

    try {
        const { resources } = await cloudinary.search
        .expression('folder:inv_lib_dump')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
        const publicIds = resources.map(file => file.public_id);
        for (let i of publicIds) {
            idCode.push(i.split('/')[1])
        }
    
        let information = await InventoryModel.find({
            'id': {
                $in: idCode,
            }
        });

        res.status(200).json({
            information
        });
    } catch (error) {
        console.error(error)
    }
})

// /inv/updateInventory
// Desc: Update an inventory item
// Method: POST

const updateInventory = asyncHandler(async (req, res) => {
    const { updateInfo } = req.body;
    const id = req.body._id;
    // Still need to add cloudinary update and double check information
    try {
        await InventoryModel.findById(id, (error, updatedItem) => {
            updatedItem.item = updateInfo.item_name;
            updatedItem.price = updateInfo.item_price;
            updatedItem.desc = updateInfo.item_desc;
            updatedItem.image = updateInfo.item_image;            
        })
    } catch (error) {
        console.error(error);
    }

    console.log(updateInfo)
})


// /inv/deleteInventory
// Desc: Delete an inventory item
// Method: POST
const deleteImage = asyncHandler(async (req, res) => {
    try {
        const { itemID } = req.body;
        await cloudinary.uploader.destroy(`inv_lib_dump/${itemID}`);
    } catch (error) {
        console.error(error);
    }
})

// Create two API - one for cloudinary and one for mongoDB
const deleteInventory = asyncHandler(async (req, res) => {
    const item_id = req.params.id;
    await InventoryModel.findByIdAndRemove( item_id ).exec();
})


module.exports = {
    newInventory,
    getInventory,
    deleteInventory,
    deleteImage,
    updateInventory
}