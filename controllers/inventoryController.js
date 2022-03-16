const asyncHandler = require('express-async-handler');
const InventoryModel = require('../models/inventoryModel');
const { cloudinary } = require('../utils/cloudinary');

const newInventory = asyncHandler(async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.
        upload(fileStr, {
            folder: 'inv_lib_dump'
        })
        console.log(uploadedResponse)
        res.json({msg: 'Image upload successful'})
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

module.exports = {
    newInventory,
    getInventory
}