import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET; // 读取环境变量

export function authMiddleware(req, res, next) {
    try {
        // 从请求头拿token
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ code: 1, message: '未登录,缺少Token' });
        }

        const token = authHeader.split(' ')[1]; // Authorization: Bearer token

        if (!token) {
            return res.status(401).json({ code: 1, message: 'Token格式错误' });
        }

        // 校验token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 把解析出来的用户信息挂到req上
        req.user = decoded;
        // 继续下一步
        next();
    } catch (error) {
        console.error('authMiddleware鉴权失败:', error);
        return res.status(401).json({ code: 1, message: 'Token无效或已过期' });
    }
}