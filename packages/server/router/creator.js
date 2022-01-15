const router = require('express').Router()
const { userAuth } = require('../middlewares/auth')

// Activity/*
const {
  handleGetCreatorByUsername,
  handleFollowOtherCreator,
} = require('../controllers/creator')

// get top project
router.get('/:username', handleGetCreatorByUsername)
router.put('/:id/follow', userAuth, handleFollowOtherCreator)

module.exports = router
