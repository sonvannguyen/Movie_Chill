const router = require('express').Router()
const auth = require('../auth/auth')
const userController = require('../controllers/userController')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/:userId',auth, userController.getUserById)

router.get('/history/:userId',auth, userController.getMoviesFromListMoviesWatched)
router.post('/add/history', auth, userController.addMovieToListMoviesWatched)
router.delete('/:userId/delete/history/:movieId', auth, userController.deleteMovieFromMoviesWatched)
router.delete('/:userId/delete/all/history', auth, userController.deleteAllMovieFromMoviesWatched)

router.get('/bookmarked/:userId', auth, userController.getMoviesFromListMoviesBookmark)
router.post('/add/bookmark', auth, userController.addMovieToListMoviesBookmark)
router.delete('/:userId/delete/bookmarked/:movieId', auth, userController.deleteMovieFromMoviesBookmark)
router.delete('/:userId/delete/all/bookmarked', auth, userController.deleteAllMovieFromMoviesBookmark)


module.exports = router