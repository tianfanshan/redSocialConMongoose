const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication } = require('../middleware/authentication');
// const { typeError } = require('../middleware/errors');

router.post('/',UserController.create);
router.put('/id/:_id',authentication,UserController.update);
router.delete('/id/:_id',authentication, UserController.delete);
router.get('/',UserController.getAll);
router.post('/login',UserController.login);
// router.delete('/logout/:_id',UserController.logout);
router.get('/currentUser/:_id',UserController.getCurrentUser);
router.get('/id/:_id',UserController.getUserById);
router.get('/name/:name',UserController.getUserByName);
router.get('/confirm/:email',UserController.confirm);

// append.use(typeError)

module.exports = router;