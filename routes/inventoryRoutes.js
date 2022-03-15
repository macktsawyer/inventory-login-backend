const express = require('express')
const router = express.Router()
const { newInventory } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/newInventory', newInventory)


module.exports = router