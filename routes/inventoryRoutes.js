const express = require('express')
const router = express.Router()
const { newInventory, getInventory, deleteInventory } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/newInventory', newInventory)
router.post('/deleteInventory', deleteInventory)

router.get('/getInventory', getInventory)


module.exports = router