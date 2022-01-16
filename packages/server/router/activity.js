const router = require('express').Router()

// Activity/*
const handleGetActivity = require('../controllers/activity')

// get top project
router.get('/', handleGetActivity)

module.exports = router
