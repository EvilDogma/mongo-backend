const router = require('express').Router()
const {User} = require('../models')
function handleErrors(errors, res) {

}

// Register User
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body)

    req.session.user_id = user._id

    res.json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    console.log(error)
  }
})

// Login User
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(404).json({
      message: 'User not found with that email address.'
    })

    const pass_valid = await user.validatePass(req.body.password)

    if (!pass_valid) return res.status(403).json({
      message: 'Your password is incorrect.'
    })

    req.session.user_id = user._id

    res.json({
      message: 'User logged in successfully',
      user
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router