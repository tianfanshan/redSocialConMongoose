const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isAuthor } = require('../middleware/authentication');

const multer = require('multer')

const fileStorageEngine =  multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images/map')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage:fileStorageEngine});

router.post('/',authentication,upload.array('images',5),PostController.create);
router.put('/id/:_id',authentication,isAuthor,upload.array('images',5),PostController.update);
router.delete('/id/:_id',authentication,isAuthor, PostController.delete);
router.get('/id/:_id',PostController.getPostById);
router.get('/body/:body',PostController.getPostByBody);
router.get('/postWithUserByBody/:body',PostController.getPostWithUserByBody);
router.get('/',PostController.getAll);
router.put('/likesUp/:_id',authentication,PostController.likesUp);
router.put('/likesDown/:_id',authentication,PostController.likesDown);

module.exports = router