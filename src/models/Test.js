const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  answerOptions: [
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
})

const testSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  title: { type: String, required: true },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Test', testSchema)
