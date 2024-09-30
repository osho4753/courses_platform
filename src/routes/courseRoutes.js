const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { checkRole } = require('../middleware/roleMiddleware')
const upload = require('../middleware/uploadMd')

const {
  createCourse,
  updateCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
} = require('../controllers/courseController')

const router = express.Router()

router.post(
  '/',
  protect,
  checkRole('teacher', 'admin'),
  upload.single('file'),
  createCourse
)

router.put(
  '/:id',
  protect,
  checkRole('teacher', 'admin'),
  upload.single('file'),
  updateCourse
)
router.get('/', protect, getAllCourses)
router.get('/:id', protect, getCourseById)
router.delete('/:id', protect, checkRole('admin', 'teacher'), deleteCourse)

module.exports = router
