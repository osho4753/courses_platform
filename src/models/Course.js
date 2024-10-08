const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course must have a title'],
  },
  description: {
    type: String,
    required: [true, 'Course must have a description'],
  },
  content: {
    type: String,
    required: [true, 'Course must have a content'],
  },
  media: {
    type: String,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
