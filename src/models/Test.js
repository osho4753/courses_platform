const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctOption: { type: Number, required: true },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Преподаватель
    required: true,
  },
})

const Test = mongoose.model('Test', testSchema)
module.exports = Test
