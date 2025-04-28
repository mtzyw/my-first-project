import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

// 注册新用户
export async function registerUser({ id,name, email, password }) {
    await db.insert(users).values({
        id,
      name,
      email,
      password
    });
  }
//登陆的时候查询用户
// 查询用户：根据email
export async function findUserByEmail(email) {
    const userList = await db.select().from(users).where(eq(users.email, email));
    return userList[0];
}

