const express = require('express')
const { checkRole } = require('../middleware/roleMiddleware')
const { protect } = require('../middleware/authMiddleware')
const {
  createTest,
  deleteTest,
  completeTest,
  getTestsForCourse,
} = require('../controllers/testController')

const router = express.Router()

router.post('/', protect, checkRole('teacher', 'admin'), createTest)
router.delete('/', protect, checkRole('teacher', 'admin'), deleteTest)
router.post('/complete', protect, completeTest)
router.get('/:id', protect, getTestsForCourse)
module.exports = router
