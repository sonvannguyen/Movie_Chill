const router = require('express').Router()
const movieGroupController = require('../controllers/movieGroupController')

router.get('/', movieGroupController.getAllGroup)
router.post('/create', movieGroupController.createNewMovieGroup)
router.post('/addMovie', movieGroupController.addMovieToMovieGroup)
router.get('/:groupName', movieGroupController.getMoviesInMovieGroup)
router.put('/update/:movieGroupId', movieGroupController.updateGroupName)
router.delete('/delete/:movieGroupId', movieGroupController.deleteGroup)
router.delete('/delete/movie/:movieGroupId/:movieId', movieGroupController.deleteMovieInGroup)

module.exports = router