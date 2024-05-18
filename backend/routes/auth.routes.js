import express from 'express'
import { getUser, login, logout, signup } from '../controllers/auth.controller.js'
import { protectedRoute } from '../middlewares/ProtectRoutes.js'

const router = express.Router()

router.get('/user', protectedRoute, getUser)

router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)


export default router