// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import {findUserByEmail} from '../services/user.service.js';
import jwt from 'jsonwebtoken';

// 生产环境要放到.env里！
const JWT_SECRET = process.env.JWT_SECRET;


// 登录接口
export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ code: 1, message: "参数缺失" });
        }

        // 根据email查询用户
        const userList = await findUserByEmail(email)

        if (!userList) {
            return res.status(400).json({ code: 1, message: "用户不存在" });
        }

        // 比对密码
        const isMatch = await bcrypt.compare(password, userList.password);
        if (!isMatch) {
            return res.status(400).json({ code: 1, message: "密码错误" });
        }

        // 签发JWT Token
        const token = jwt.sign(
            {
                id: userList.id,
                email: userList.email
            },
            JWT_SECRET,
            { expiresIn: '7d' } // token有效期7天
        );

        res.json({ code: 0, message: "登录成功", token });

    } catch (error) {
        console.error('登录接口异常', error);
        res.status(500).json({ code: 1, message: '登录失败' });
    }
}
