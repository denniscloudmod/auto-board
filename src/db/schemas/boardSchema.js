import { pgTable, serial, text, timestamp, varchar, integer, jsonb , boolean, date, uuid, doublePrecision } from 'drizzle-orm/pg-core';


export const boards = pgTable('boards', {
    // id: serial('id').primaryKey(),
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    color: varchar('color', { length: 7 }).notNull().default('#3490dc'),
    userId: uuid('user_id'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const columns = pgTable('columns', {
    id: serial('id').primaryKey(),
    // boardId: serial('board_id').references(() => boards.id),
    boardId: uuid('board_id').references(() => boards.id),
    label: varchar('label', { length: 255 }).notNull(),
    dataField: varchar('data_field', { length: 255 }).notNull(),
    // boardId: integer('board_id').references(() => board.id).notNull(),
    // order: serial('order').notNull(),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});


export const tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().defaultRandom(),
    boardId: uuid('board_id').notNull().references(() => boards.id),
    columnId: integer('column_id').notNull().references(() => columns.id),
    title: text('title').notNull(),
    description: text('description'),
    priority: varchar('priority', { length: 50 }),
    progress: doublePrecision('progress'),
    startDate: date('start_date'),
    dueDate: date('due_date'),
    tags: text('tags'),
    swimlane: varchar('swimlane', { length: 255 }),
    userId: uuid('user_id'),
    status: varchar('status', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});



export const checklists = pgTable('checklists', {
    id: uuid('id').primaryKey().defaultRandom(),
    taskId: uuid('task_id').references(() => tasks.id),
    text: text('text'),
    completed: boolean('completed').default(false),
});

export const comments = pgTable('comments', {
    id: uuid('id').primaryKey().defaultRandom(),
    taskId: uuid('task_id').references(() => tasks.id),
    userId: uuid('user_id'),
    text: text('text'),
    time: timestamp('time').defaultNow(),
});



