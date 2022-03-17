const express = require('express')
const router = express.Router()
const { newInventory, getInventory, getInformation } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/newInventory', newInventory)

router.get('/getInventory', getInventory)
router.get('/getInformation/:number', getInformation)

module.exports = router