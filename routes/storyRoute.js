const router = require('express').Router()
const storyController = require('../controllers/storyController')
const auth = require('../middlewares/auth')

router.get('/list/:userId', storyController.getStoriesByUserId)
router.get('/all', storyController.getAllStories)
router.get('/all/following/:userId', storyController.getAllTheFollowingStories)

router.post('/create/:userId', auth, storyController.createNewStoryByUserId)
router.put('/:storyId', auth, storyController.updateStoryByStoryId)
router.delete('/:userId/:storyId', auth, storyController.deleteStoryByStoryId)

module.exports = router