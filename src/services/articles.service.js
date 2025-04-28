import { db } from '../db/index.js';
import { articles } from '../db/schema.js';

export async function registerArticles({ id,title,content,user_id}) {
    await db.insert(articles).values({
        id,
        title,
        content,
        user_id,
    });
  }