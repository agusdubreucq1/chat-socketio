import { Router } from 'express'
import userController from '../controllers/users'

const router = Router()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)

export default router
