const router = require('express').Router()
const conversationController = require('../controllers/conversationController')
const auth = require('../middlewares/auth')

router.post('/', auth, conversationController.createNewConversation)

router.get('/:userId', auth, conversationController.getListConversationOfUser)

router.get('/:senderId/:receiverId', auth, conversationController.getConversationForBoxChat)

router.delete('/:conversationId', auth, conversationController.deleteConversation)

module.exports = router