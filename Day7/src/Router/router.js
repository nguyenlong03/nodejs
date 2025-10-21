import express from 'express';
import { login, register , getdata ,refreshToken,forgotPassword,resetPassword,showResetForm } from '../Controllers/web.js';
import { validate } from '../middleware/validateMiddleware.js';
import { registerSchema, loginSchema } from '../utils/userValidation.js';

const router = express.Router();

router.get('/', getdata)
router.post('/login', login);   
router.post("/register", validate(registerSchema), register);
router.post("/refresh", validate(loginSchema),refreshToken); 
router.post('/forgotpassword', forgotPassword);
router.get('/resetpassword', showResetForm);
router.post('/resetpasssword', resetPassword);

export default router;
