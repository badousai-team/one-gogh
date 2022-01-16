const router = require('express').Router()
const { userAuth } = require('../middlewares/auth')

// Activity/*
const {
  handleFetchAllCreator,
  handleGetCreatorByUsername,
  handleFollowOtherCreator,
} = require('../controllers/creator')

// get top project
router.get('/', handleFetchAllCreator)
router.get('/:username', handleGetCreatorByUsername)
router.put('/:id/follow', userAuth, handleFollowOtherCreator)

module.exports = router
