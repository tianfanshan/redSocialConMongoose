const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isAuthor } = require('../middleware/authentication');

router.post('/',authentication,PostController.create);
router.put('/id/:_id',authentication,isAuthor,PostController.update);
router.delete('/id/:_id',authentication, PostController.delete);

module.exports = router