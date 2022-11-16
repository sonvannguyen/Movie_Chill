const router = require('express').Router()
const postController = require('../controllers/postController')
const auth = require('../middlewares/auth')

router.get('/list/:userId', postController.getPostsByUserId)
router.get('/all', postController.getAllPosts)

router.get('/all/following/:userId', postController.getAllTheFollowingPosts)
router.post('/create/:userId', auth, postController.createNewPostByUserId)

router.get('/:postId', postController.getPostById)
router.put('/:postId', auth, postController.updatePostByPostId)
router.post('/:postId', auth, postController.loveAndNotLoveThePost)
router.get('/loves/:postId', postController.getAllUserLovedPost)
router.delete('/:owner/:postId', auth, postController.deletePostByPostId)

router.post('/comment/:postId', auth, postController.createComment )
router.get('/comments/:postId', postController.getAllComments )

module.exports = router 