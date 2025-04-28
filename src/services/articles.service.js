import { db } from '../db/index.js';
import { articles } from '../db/schema.js';
import { eq } from 'drizzle-orm';
//生成文章数据库接口
export async function registerArticles({ id,title,content,user_id}) {
    await db.insert(articles).values({
        id,
        title,
        content,
        user_id,
    });
  }
//查询文章数据库接口
export async function findArticles({ user_id, page = 1, pageSize = 10 }) {
    const offset = (page - 1) * pageSize;
    const list = await db
      .select()
      .from(articles)
      .where(eq(articles.user_id, user_id))
      .limit(pageSize)
      .offset(offset);
    return list;
  }
//根据文章id查询文章
export async function findidArticles(){
  
}

