import express from 'express';
import { login, signup, protectedRoute, isAuthenticate } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', authenticate, protectedRoute);
router.post('/isAuthed', authenticate, isAuthenticate);



export default router;


