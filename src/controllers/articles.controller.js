import { v4 as uuidv4 } from 'uuid';
import {registerArticles,findArticles} from '../services/articles.service.js';

//生成文章接口
export async function articlesController(req, res) {
    try {
        //获取请求信息中的用户信息中的id
        const{user} = req
        const {title,content} = req.body;
        console.log(user.id,title,content)
        if (!user.id || !title || !content) {
            return res.status(400).json({ code: 1, message: "参数缺失" });
        }
        //生成文章的id 
        const articlesid = uuidv4()

        await registerArticles({
            id:articlesid,
            title,
            content,
            user_id:user.id,
        })
        res.status(200).json({ code: 0, message: '生成成功' });
        
    } catch (error) {
        console.error('文章生成接口异常', error);
        res.status(500).json({ code: 1, message: '生成失败' });
    }

}
//根据用户id查询他所有文章的分页接口
export async function listArticlesController(req, res) {
    try {
        const userId = req.user.id;
        //get请求从url中拿页数
        const page = Number(req.query.page) || 1;
        //get请求从url中拿每页数量
        const pageSize = Number(req.query.pageSize) || 10; // 每页数量，默认10条

        const list = await findArticles({
            user_id:userId,
            page,
            pageSize
        })
        if(!list){
            res.status(404).json({ code: 1, message: '没有文章' });
        }
        res.status(200).json({ code: 0, message: '查询' ,list:list});

    } catch (error) {
        console.error('文章生成接口异常', error);
        res.status(500).json({ code: 1, message: '查询失败' });
    }
}

//根据文章id去查询文章
export async function findIdArticlesController(req, res) {
    try {
        //从url中解析出来文章id
        const articleid = req.query.id

        

        
    } catch (error) {
        
    }

}