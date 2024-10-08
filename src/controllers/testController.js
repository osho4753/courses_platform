const Test = require('../models/Test')
const Course = require('../models/Course')
const Progress = require('../models/Progress')

exports.createTest = async (req, res) => {
  const { courseId, questions } = req.body
  console.log(courseId)
  try {
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(402).json({ message: 'There isnt course' })
    }

    const test = new Test({
      course: courseId,
      questions,
      createdBy: req.user._id,
    })

    await test.save()

    course.tests.push(test._id)
    await course.save()
    res.status(201).json(test)
  } catch (error) {
    res.status(500).json({ message: 'Test error', error: error.message })
  }
}
exports.deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
    if (!test) {
      return res.status(404).json({ message: 'Test not found' })
    }

    await test.deleteOne()
    res.status(200).json({ message: 'Test deleted' })
  } catch (error) {
    res.status(500).json({ message: 'server error' })
  }
}
exports.completeTest = async (req, res) => {
  const { testId, answers } = req.body

  try {
    const test = await Test.findById(testId)
    if (!test) {
      return res.status(404).json({ message: 'Test not found' })
    }

    let correctAnswersCount = 0
    test.questions.forEach((question, index) => {
      const userAnswer = answers[index]
      const correctAnswer = question.answerOptions.find(
        (option) => option.isCorrect
      )
      if (userAnswer === correctAnswer.answerText) {
        correctAnswersCount++
      }
    })

    const score = (correctAnswersCount / test.questions.length) * 100

    let progress = await Progress.findOne({
      studentId: req.user._id,
      courseId: test.courseId,
    })
    if (!progress) {
      progress = new Progress({
        studentId: req.user._id,
        courseId: test.courseId,
        completedLessons: [],
        testResults: [{ testId, score }],
      })
    } else {
      progress.testResults.push({ testId, score })
    }

    await progress.save()

    res.status(200).json({ message: 'Test complete', score, progress })
  } catch (error) {
    res.status(500).json({ message: 'error test', error: error.message })
  }
}
exports.getTestsForCourse = async (req, res) => {
  const courseId = req.params.id
  try {
    const tests = await Test.find({ course: courseId })
    if (!tests.length) {
      return res.status(404).json({ message: 'There isnt tests' })
    }

    res.status(200).json(tests)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
