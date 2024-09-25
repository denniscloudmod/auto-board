import {pgTable, serial, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";


export const users = pgTable('users', {
    id: serial("id").primaryKey(),
    password: text("password"),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).unique(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});