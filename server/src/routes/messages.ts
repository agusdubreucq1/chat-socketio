import { Router } from "express";
import messagesController from "../controllers/message"

const router = Router()

router.get('/:id',messagesController.getMessagesByChatId )
router.get('/unread/:idChat', messagesController.getUnreadMessages)
router.put('/read/:idChat', messagesController.readChat)
router.post('/:id', messagesController.createMessage)

export default router