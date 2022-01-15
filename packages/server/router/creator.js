const router = require('express').Router()

// Activity/*
const {
  handleGetCreatorByUsername,
} = require('../controllers/creator')

// get top project
router.get('/:username', handleGetCreatorByUsername)

module.exports = router
