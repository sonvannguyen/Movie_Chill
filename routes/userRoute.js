const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/search', userController.searchUserByUsername)

router.get('/:userId', userController.getUserById)
router.put('/:userId', auth, userController.updateUser)
router.delete('/:userId', auth, userController.deleteUser)

router.post('/:userId/:followId', userController.followOrUnFollow)
router.get('/follower/:userId', userController.getFollowerList)
router.get('/following/:userId', userController.getFollowingList)

router.get('/view/:userId/:profileId', auth, userController.userViewProfile)
router.get('/usersview/:userId', auth, userController.getUsersViewProfile)


module.exports = router