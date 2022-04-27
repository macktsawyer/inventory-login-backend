const express = require('express')
const router = express.Router()
const { newInventory, getInventory, deleteInventory, deleteImage, updateInventory } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/newInventory', newInventory)
router.post('/deleteImage', deleteImage)
router.put('/updateInventory', updateInventory)

router.delete('/deleteInventory/:id', deleteInventory)

router.get('/getInventory', getInventory)


module.exports = router