const express = require('express')
const router = express.Router()
const { newInventory, getInventory, deleteInventory, deleteImage } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/newInventory', newInventory)
router.post('/deleteImage', deleteImage)

router.delete('/deleteInventory/:id', deleteInventory)

router.get('/getInventory', getInventory)


module.exports = router