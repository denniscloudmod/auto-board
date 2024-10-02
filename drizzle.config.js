import '@/db/envConfig';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_URL,
    },
    out: "./migrations",
});

