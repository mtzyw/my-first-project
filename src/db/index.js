// src/db/index.js

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// 创建连接对象
const client = postgres('postgres://bio:xx112211@38.246.250.234:5432/bio');

// drizzle封装
export const db = drizzle(client);
