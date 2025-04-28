import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // ❗只设primaryKey，不要defaultRandom！
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  password: varchar('password', { length: 255 }),
  created_at: timestamp('created_at').defaultNow(), // 创建时间默认当前时间
  updated_at: timestamp('updated_at').defaultNow(), // 更新时间自动刷新
});

export const articles = pgTable('articles', {
  id: uuid('id').primaryKey(),              // 主键ID
  title: varchar('title', { length: 255 }),  // 标题
  content: text('content'),                  // 正文内容
  user_id: uuid('user_id'),                  // 关联用户的id
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});