import express, {Request, Response} from 'express';
import { login, signup, protectedRoute, isAuthenticate } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';
import { prisma } from '../config/db';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', authenticate, protectedRoute);
router.post('/isAuthed', authenticate, isAuthenticate);



export default router;


