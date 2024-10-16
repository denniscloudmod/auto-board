// import '@/db/envConfig';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

// import dotenv from 'dotenv';
//
// dotenv.config()

export const db = drizzle(sql, { schema });


// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import * as schema from './schema';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectionString = process.env.POSTGRES_URL;

// if (!connectionString) {
//     throw new Error('POSTGRES_URL is not defined');
// }

// const client = postgres(connectionString);
// export const db = drizzle(client, { schema });