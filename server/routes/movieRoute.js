const router = require('express').Router()
const movieController = require('../controllers/movieController')

router.get('/', movieController.getAllMovie)
router.get('/search', movieController.searchMovieByName)
router.get('/filter', movieController.filterMoviesByMultiField)

router.post('/create', movieController.createMovie)
router.get('/detail/:slug', movieController.getMovieDetail)
router.put('/update/:movieId', movieController.updateMovie)
router.delete('/delete/:movieId', movieController.deleteMovie)

// router.post('/add/all', movieController.addMoviesFromFileData)

module.exports = router