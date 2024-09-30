const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { checkRole } = require('../middleware/roleMiddleware')
const {
  getAllUsers,
  deleteUser,
  makeTeacher,
  makeStudent,
} = require('../controllers/userController')

const router = express.Router()

router.get('/', protect, checkRole('admin'), getAllUsers)
router.delete('/:id', protect, checkRole('admin'), deleteUser)
router.put('/remove-teacher/:id', protect, checkRole('admin'), makeStudent)
router.put('/assign-teacher/:id', protect, checkRole('admin'), makeTeacher)

module.exports = router
