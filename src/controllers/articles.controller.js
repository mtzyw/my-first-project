import { v4 as uuidv4 } from 'uuid';
import {registerArticles} from '../services/articles.service.js';

export async function articlesController(req, res) {

    try {
        //获取请求信息中的用户信息中的id
        const {id,title,content} = req.body;
        console.log(id,title,content)
        //检查内容
        if (!id || !title || !content) {
            return res.status(400).json({ code: 1, message: "参数缺失" });
        }
        //生成文章的id 
        const articlesid = uuidv4()

        await registerArticles({
            id:articlesid,
            title,
            content,
            user_id:id,
        })
        
    } catch (error) {
        console.error('文章生成接口异常', error);
        res.status(500).json({ code: 1, message: '注册失败' });
    }

}