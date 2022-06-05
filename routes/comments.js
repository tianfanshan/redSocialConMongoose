const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { authentication, isAuthor } = require('../middleware/authentication');


router.post('/',authentication,CommentController.create);
router.put('/id/:_id',authentication,CommentController.update);
router.delete('/id/:_id',authentication,CommentController.delete);


module.exports = router;