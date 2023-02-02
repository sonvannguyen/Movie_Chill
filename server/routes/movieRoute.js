const router = require('express').Router()
const movieController = require('../controllers/movieController')

router.get('/', movieController.getAllMovie)
router.get('/search', movieController.searchMovieByName)
router.get('/filter', movieController.filterMoviesByMultiField)

router.post('/create', movieController.createMovie)
router.put('/update/:movieId', movieController.updateMovie)
router.delete('/delete/:movieId', movieController.deleteMovie)

module.exports = router