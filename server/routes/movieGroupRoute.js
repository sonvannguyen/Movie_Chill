const router = require('express').Router()
const auth = require('../auth/auth')
const movieGroupController = require('../controllers/movieGroupController')

router.get('/', movieGroupController.getAllGroup)
router.get('/:groupName', movieGroupController.getMoviesInMovieGroup)

router.post('/create',auth, movieGroupController.createNewMovieGroup)
router.post('/addMovie',auth, movieGroupController.addMovieToMovieGroup)
router.put('/update/:movieGroupId', auth, movieGroupController.updateGroupName)
router.delete('/delete/:movieGroupId',auth, movieGroupController.deleteGroup)
router.delete('/delete/movie/:movieGroupId/:movieId',auth, movieGroupController.deleteMovieInGroup)

module.exports = router 