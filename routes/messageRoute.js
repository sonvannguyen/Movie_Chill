const router = require('express').Router()
const messageController = require('../controllers/messageController')
const auth = require('../middlewares/auth')

router.post('/', auth, messageController.createNewMessage)
router.get('/:conversationId', auth, messageController.getMessageByConversationId )
module.exports = router