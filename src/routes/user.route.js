import express from 'express';
import { registerController } from '../controllers/user.controller.js';
import { loginController } from '../controllers/auth.controller.js';

const router = express.Router();

// 注册接口
router.post('/register', registerController);
router.post('/login', loginController);

export default router;
