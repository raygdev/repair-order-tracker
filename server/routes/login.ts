import express from 'express'
const router = express.Router()


import { userLoginController } from '../controllers/user-login-controller';

router.post('/api/login',userLoginController)

export { router as loginRoute }