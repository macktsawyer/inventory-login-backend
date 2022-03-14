const asyncHandler = require('express-async-handler');
const InventoryModel = require('../models/inventoryModel');


const newInventory = asyncHandler(async (req, res) => {

    res.json({
        message: 'Success',
    })
});

module.exports = {
    newInventory,
}