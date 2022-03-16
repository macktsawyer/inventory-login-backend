const express = require('express')
const router = express.Router()
const { newInventory, getInventory } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/newInventory', newInventory)

router.get('/getInventory', getInventory)

module.exports = router