const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication, isAdmin, isAuthor } = require('../middleware/authentication');
// const { typeError } = require('../middleware/errors');

router.post('/',UserController.create);
router.put('/id/:_id',authentication,UserController.update);
router.delete('/id/:_id',authentication,isAdmin, UserController.delete);
router.get('/',UserController.getAll);
router.post('/login',UserController.login);
router.put('/logout/',authentication, UserController.logout);
router.get('/currentUser/:_id',UserController.getCurrentUser);
router.get('/id/:_id',UserController.getUserById);
router.get('/name/:name',UserController.getUserByName);
router.get('/confirm/:email',UserController.confirm);
router.get('/userName/:name',authentication,UserController.getUserLogged);



module.exports = router;