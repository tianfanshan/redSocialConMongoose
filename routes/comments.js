const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { authentication, isAuthorComment } = require('../middleware/authentication');

const multer = require('multer')

const fileStorageEngine =  multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images/comments-images')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage:fileStorageEngine});

router.post('/',authentication,upload.array('images',5),CommentController.create);
router.put('/id/:_id',authentication,isAuthorComment,upload.array('images',5),CommentController.update);
router.delete('/id/:_id',authentication,isAuthorComment,CommentController.delete);
router.put('/likeById/:_id',authentication,CommentController.like);
router.put('/likeDownById/:_id',authentication,CommentController.likeDown);
router.get('/id/:_id',CommentController.getById);

module.exports = router;