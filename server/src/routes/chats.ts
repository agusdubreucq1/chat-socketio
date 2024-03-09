import { Router } from 'express'
import chatsController from '../controllers/chats'

const router = Router()

router.get('/', chatsController.getChats)
router.get('/:id', chatsController.getChatByID)
router.post('/', chatsController.createChat)
router.post('/group', chatsController.createGroupChat)

export default router
