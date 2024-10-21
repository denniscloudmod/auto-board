import {pgTable, serial, text, varchar, timestamp, integer, uuid} from 'drizzle-orm/pg-core';


export const projectPlan = pgTable('project_plan', {
    id: serial('id').primaryKey(),
    userId : uuid('user_id').notNull(),
    title: varchar('title', {length: 255}).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

