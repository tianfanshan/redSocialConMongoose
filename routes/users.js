const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const User = require('../models/User')

router.post('/',UserController.create);

module.exports = router;