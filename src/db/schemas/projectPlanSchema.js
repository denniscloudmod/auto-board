import {pgTable, serial, text, varchar, timestamp, integer, uuid} from 'drizzle-orm/pg-core';
import {boards} from "@/db/schemas/boardSchema";

export const projectPlan = pgTable('project_plan', {
    id: serial('id').primaryKey(),
    userId : uuid('user_id').notNull(),
    title: varchar('title', {length: 255}).notNull(),
    content: text('content').notNull(),
    has_kanban: integer('has_kanban').default(0),
    boardId: uuid('board_id').references(() => boards.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

