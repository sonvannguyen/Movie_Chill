const router = require('express').Router()
const movieController = require('../controllers/movieController')
const auth = require('../auth/auth')

router.get('/', movieController.getAllMovie)
router.get('/search', movieController.searchMovieByName)
router.get('/filter', movieController.filterMoviesByMultiField)

router.post('/create', movieController.createMovie)
router.get('/detail/:slug', movieController.getMovieDetail)
router.put('/update/:movieId', movieController.updateMovie)
router.delete('/delete/:movieId', movieController.deleteMovie)

// router.post('/add/all', movieController.addMoviesFromFileData)
router.post('/create/comment', auth, movieController.createCommentMovie)
router.delete('/:movieId/comment/:commentId', auth, movieController.deleteCommentMovie)

module.exports = router