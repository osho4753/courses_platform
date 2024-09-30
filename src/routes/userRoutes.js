const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { checkRole } = require('../middleware/roleMiddleware')
const { getAllUsers, deleteUser } = require('../controllers/userController')

const router = express.Router()

router.get('/', protect, checkRole('admin'), getAllUsers)

router.delete('/:id', protect, checkRole('admin'), deleteUser)

module.exports = router
