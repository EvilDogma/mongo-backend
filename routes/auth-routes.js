const router = require('express').Router()
const mongoose = require('mongoose')
const { User, Thought } = require('../models')


function validateParams(req, res, next) {
  const { user_id, friend_id } = req.params;

  if (!mongoose.isValidObjectId(friend_id) || !mongoose.isValidObjectId(user_id)) {
    return res.status(400).json({ error: "Invalid ObjectID" });
  }

  // Proceed to the next middleware or route handler
  next();
}


router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)

  } catch {

  }
})

router.get('/users/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)
    res.json(user)
  } catch {

  }
})

router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body)
    newUser.save()
    res.json({ message: 'user added' })

  } catch {

  }
})

router.put('/users/:user_id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: req.params.user_id }, req.body, { new: true })
    updatedUser.save()
    res.json({ message: 'user updated' })
  } catch {

  }
})

router.delete('/users/:user_id', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.user_id });
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' })
    } else {
      res.json({ message: 'User not found' })
    }

  } catch {

  }
})

router.post('/users/:user_id/friends/:friend_id', validateParams, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: req.params.user_id }, { $push: { friends: req.params.friend_id } }, { new: true })
    updatedUser.save()
    res.json({ message: 'user updated' })
  } catch (error) {
    console.log(error)

  }
})

router.delete('/users/:user_id/friends/:friend_id', validateParams, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: req.params.user_id }, { $pull: { friends: req.params.friend_id } }, { new: true })
    updatedUser.save()
    res.json({ message: 'user updated' })
  } catch (error) {
    console.log(error)

  }
})


router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find({})
    res.json(thoughts)

  } catch {

  }
})

router.get('/thoughts/:thought_id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thought_id)
    res.json(thought)
  } catch {

  }
})

router.post('/thoughts', async (req, res) => {
  try {
    const newThought = new Thought(req.body)
    newThought.save()
    const updatedUser = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: newThought._id } }, { new: true })
    res.json({ message: 'thought added' })

  } catch {

  }
})

router.put('/thoughts/:thought_id', async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thought_id }, req.body, { new: true })
    res.json({ message: 'thought updated' })
  } catch {

  }
})

router.delete('/thoughts/:thought_id', async (req, res) => {
  try {
    const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thought_id });
    if (deletedThought) {
      res.json({ message: 'Thought deleted successfully' })
    } else {
      res.json({ message: 'Thought not found' })
    }

  } catch {

  }
})

router.post('/thoughts/:thought_id/reactions', async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thought_id }, { $addToSet: { reactions: req.body }}, { new: true })
    res.json({ message: 'Reaction added' })
  } catch (error) {
    console.log(error)

  }
})

router.delete('/thoughts/:thought_id/reactions', async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thought_id }, { $pull: { reactions: req.body }}, { new: true })
    res.json({ message: 'Reaction deleted' })
  } catch (error) {
    console.log(error)

  }
})



module.exports = router