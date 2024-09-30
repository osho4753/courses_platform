const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  testResults: [
    {
      testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
      score: { type: Number, required: true },
      completedAt: { type: Date, default: Date.now },
    },
  ],
})

module.exports = mongoose.model('Progress', progressSchema)
