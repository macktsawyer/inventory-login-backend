const asyncHandler = require('express-async-handler');
const InventoryModel = require('../models/inventoryModel');
const { cloudinary } = require('../utils/cloudinary');


const newInventory = asyncHandler(async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.
        upload(fileStr, {
            upload_preset: 'inv_lib_dump'
        })
        console.log(uploadedResponse)
        res.json({msg: 'Image upload successful'})
    } catch (error) {
        console.error(error)
        res.json(500).json({err: 'Upload didnt work out well'})
    }
});

module.exports = {
    newInventory,
}