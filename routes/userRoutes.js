const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getDashboard, logoutUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.post('/login', loginUser)
router.post('/dashboard', protect, getDashboard)
router.post('/logout', logoutUser)
router.post('/register', registerUser)

module.exports = router