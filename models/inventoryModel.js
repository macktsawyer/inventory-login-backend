const mongoose = require('mongoose');

const Inventory = new mongoose.Schema({
    id: { type: String, require: true},
    item: { type: String, required: true },
    description: { type: String, required: false},
    price: { type: String, required: true }, 
    image: { type: String, required: true },
}, { collection: 'Inventory'}
)

const InventoryModel = mongoose.model('Inventory', Inventory)

module.exports = InventoryModel