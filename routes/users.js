const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController');

router.post('/',UserController.create);
router.put('/id/:_id',UserController.update);
router.delete('/id/:_id',UserController.delete);
router.get('/',UserController.getAll);
router.post('/login',UserController.login);
// router.delete('/logout/:_id',UserController.logout);
router.get('/currentUser/:_id',UserController.getCurrentUser);
router.get('/id/:_id',UserController.getUserById);
router.get('/name/:name',UserController.getUserByName);

module.exports = router;