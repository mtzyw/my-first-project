//导入写入数据库的方法
import { v4 as uuidv4 } from 'uuid';
import { registerUser, findUserByEmail} from '../services/user.service.js';
import bcrypt from 'bcryptjs';

//处理接收到请求 然后去验证 没问题的话 再去执行registerUser方法 等registerUser完成以后 再返回信息给前端

export async function registerController(req,res) {
    //try catch 在try里执行任务 如果遇到错误就会执行 catch 并且 catch的参数就是错误信息
    try {
        //检测穿过来的信息没问题就放行 要和数据库一致
        const {name,email,password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({code:1,message:"参数缺失"})
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ code: 1, message: "该邮箱已经注册" });
        }

        const id = uuidv4(); // 生成一个新的UUID主键id！
        //对密码加密
        const hashedPassword = await bcrypt.hash(password, 10);

        //执行数据库去写入
        await registerUser({id,name,email,password:hashedPassword})

        res.json({code:1,message:"注册成功"})
        
    } catch (error) {
        console.error('注册接口异常', error);
        res.status(500).json({ code: 1, message: '注册失败' });
    }
    
}

