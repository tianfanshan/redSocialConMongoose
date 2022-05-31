const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/',UserController.create);
router.put('/id/:_id',UserController.update);

module.exports = router;