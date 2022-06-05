const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { authentication, isAuthorComment } = require('../middleware/authentication');


router.post('/',authentication,CommentController.create);
router.put('/id/:_id',authentication,isAuthorComment,CommentController.update);
router.delete('/id/:_id',authentication,isAuthorComment,CommentController.delete);
router.put('/likeById/:_id',authentication,CommentController.like);
router.put('/likeDownById/:_id',authentication,CommentController.likeDown);


module.exports = router;