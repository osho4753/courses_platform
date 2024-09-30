const express = require('express')
const { checkRole } = require('../middleware/roleMiddleware')
const { protect } = require('../middleware/authMiddleware')
const {
  createTest,
  deleteTest,
  completeTest,
} = require('../controllers/testController')

const router = express.Router()

router.post('/', protect, checkRole('teacher', 'admin'), createTest)
router.delete('/', protect, checkRole('teacher', 'admin'), deleteTest)
router.post('/complete', protect, completeTest)

module.exports = router
