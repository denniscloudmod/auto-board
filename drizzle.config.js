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


// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//     schema: "./src/schema.ts",
//     out: "./drizzle",
//     dialect: "postgresql",
//     dbCredentials: {
//         user: "postgres",
//         password: process.env.DATABASE_PASSWORD,
//         host: "127.0.0.1",
//         port: 5432,
//         database: "db",
//     }
// });