const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getDashboard } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.post('/login', loginUser)
router.post('/dashboard', protect, getDashboard)
router.post('/register', registerUser)

module.exports = router