const router = require('express').Router()
const movieController = require('../controllers/movieController')

router.get('/', movieController.getAllMovie)
router.post('/create', movieController.createMovie)
router.get('/search', movieController.searchMovieByName)
router.get('/filter', movieController.filterMoviesByMultiField)


module.exports = router