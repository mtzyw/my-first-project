import express from 'express';
import { registerController } from '../controllers/user.controller.js';
import { loginController } from '../controllers/auth.controller.js';
import{articlesController,listArticlesController}from "../controllers/articles.controller.js"
import {authMiddleware} from "../middlewares/auth.middleware.js"


const router = express.Router();

// 注册接口
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/articles',authMiddleware,articlesController)
router.get('/findarticles',authMiddleware,listArticlesController)

export default router;
