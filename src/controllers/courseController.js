const Course = require('../models/Course')
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name email')

    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'teacher',
      'name email'
    )

    if (!course) {
      return res.status(404).json({ message: 'Didnt find the course' })
    }

    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
exports.createCourse = async (req, res) => {
  try {
    const { title, description, content } = req.body

    const course = new Course({
      title,
      description,
      content,
      teacher: req.user._id,
      media: req.file ? `uploads/${req.file.filename}` : null,
    })

    await course.save()
    res.status(201).json({
      course,
      message: 'Course created successfully!',
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ message: 'Didnt find the course' })
    }

    if (
      course.teacher.toString() !== req.user._id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'You cant update' })
    }

    Object.assign(course, req.body)

    if (req.file) {
      course.media = req.file.path
    }

    await course.save()
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    await course.deleteOne()
    res.status(200).json({ message: 'Course deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
