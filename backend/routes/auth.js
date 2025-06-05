// backend/routes/auth.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Register route expects optional adminSecretCode to assign admin role
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
