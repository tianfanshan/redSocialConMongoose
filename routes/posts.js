const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isAuthor } = require('../middleware/authentication');

router.post('/',authentication,PostController.create);
router.put('/id/:_id',authentication,isAuthor,PostController.update);
router.delete('/id/:_id',authentication,isAuthor, PostController.delete);
router.get('/id/:_id',PostController.getPostById);
router.get('/body/:body',PostController.getPostByBody);
router.get('/postWithUserByBody/:body',PostController.getPostWithUserByBody);
router.get('/',PostController.getAll);
router.put('/likesUp/:_id',authentication,PostController.likesUp);
router.put('/likesDown/:_id',authentication,PostController.likesDown);

module.exports = router