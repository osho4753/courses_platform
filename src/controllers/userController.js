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
