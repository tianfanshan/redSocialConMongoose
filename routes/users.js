const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication, isAdmin, isAuthor } = require('../middleware/authentication');

const multer = require('multer')

const fileStorageEngine =  multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images/users-images')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage:fileStorageEngine});

router.post('/',upload.single('image'),UserController.create);
router.put('/id/:_id',upload.single('image'),authentication,UserController.update);
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