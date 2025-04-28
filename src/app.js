import dotenv from 'dotenv/config';
import express from 'express';
import userRouter from './routes/user.route.js'; // 👈 引入路由

const app = express();

app.use(express.json());

// 👇 挂载路由，加上/api前缀
app.use('/api', userRouter);

// 启动服务器
app.listen(3000, () => {
  console.log('服务器已启动: http://localhost:3000');
});
