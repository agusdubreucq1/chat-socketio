import { Router } from "express";
import messagesController from "../controllers/message"

const router = Router()

router.get('/:id',messagesController.getMessagesByChatId )
router.post('/:id', messagesController.createMessage)

export default router