const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication, isAdmin, isAuthor } = require('../middleware/authentication');
// const { typeError } = require('../middleware/errors');

router.post('/',UserController.create);
router.put('/id/:_id',authentication,isAuthor,UserController.update);
router.delete('/id/:_id',authentication,isAuthor,isAdmin, UserController.delete);
router.get('/',authentication,isAdmin,UserController.getAll);
router.post('/login',UserController.login);
router.put('/logout',authentication,isAuthor, UserController.logout);
router.get('/currentUser',authentication,UserController.getCurrentUser);
router.get('/id/:_id', UserController.getUserById);
router.get('/name/:name',UserController.getUserByName);
router.get('/confirm/:emailToken',UserController.confirm);
router.put('/followerId/:_id',authentication,isAuthor,UserController.follower);
router.put('/followeroutId/:_id',authentication,isAuthor,UserController.followerOut);
router.get('/userPostFollower',authentication,UserController.UserPostFollowerNumber);
router.get('/UserPostFollowerName',authentication,UserController.UserPostFollowerName);



module.exports = router;