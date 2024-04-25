const router = require('express').Router()
const auth = require('../auth/auth')
const userController = require('../controllers/userController')
// authorization
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/all', userController.getAllUser)
router.delete('/delete/:userId', userController.deleteUser)
router.get('/:userId',auth, userController.getUserById)

// history
router.get('/history/:userId',auth, userController.getMoviesFromListMoviesWatched)
router.post('/add/history', auth, userController.addMovieToListMoviesWatched)
router.delete('/:userId/delete/history/:movieId', auth, userController.deleteMovieFromMoviesWatched)
router.delete('/:userId/delete/all/history', auth, userController.deleteAllMovieFromMoviesWatched)

// bookmark
router.get('/bookmarked/:userId', auth, userController.getMoviesFromListMoviesBookmark)
router.post('/add/bookmark', auth, userController.addMovieToListMoviesBookmark)
router.delete('/:userId/delete/bookmarked/:movieId', auth, userController.deleteMovieFromMoviesBookmark)
router.delete('/:userId/delete/all/bookmarked', auth, userController.deleteAllMovieFromMoviesBookmark)

// comment
router.post('/create/comment', auth,userController.createCommentMovie)
router.delete('/delete/comment/:commentId', auth,userController.deleteCommentMovie)
router.post('/update/comment',auth, userController.updateCommentMovie)
router.post('/report/comment', auth,userController.reportCommentMovie)
router.get('/report/comment',auth, userController.getAllReportComment)

// follow movie
router.post('/follow', auth, userController.followMovie)
router.post('/unfollow', auth, userController.unfollowMovie)

module.exports = router