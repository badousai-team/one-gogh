const router = require('express').Router()

// Activity/*
const {
  handleGetNft,
} = require('../controllers/nft')

// get top project
router.get('/:id', handleGetNft)

module.exports = router
