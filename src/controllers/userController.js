const User = require('../models/User')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: ' Error' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.deleteOne()
    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: 'sdf error' })
  }
}
exports.makeTeacher = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'Cant find user' })
    }

    user.role = 'teacher'
    await user.save()
    res.status(200).json({ message: 'User is teacher now', user })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
exports.makeStudent = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.role = 'student'
    await user.save()
    res.status(200).json({ message: 'Now you student', user })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
