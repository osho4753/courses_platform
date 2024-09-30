const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' })
    }

    const user = new User({ name, email, password, role })
    await user.save()
    const token = generateToken(user._id)
    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ message: ' error' })
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Wrong email or password' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong email or password' })
    }

    const token = generateToken(user._id)
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
