import express from 'express';
import { sendVerificationCode, verifyCode, registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();


// Register route expects optional adminSecretCode to assign admin role
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-verification-code', sendVerificationCode);
router.post('/verify-code', verifyCode);

export default router;
