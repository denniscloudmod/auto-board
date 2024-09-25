'use server';


import {revalidatePath} from "next/cache";
import {boards, columns, tasks} from "@/db/schema";
import {db} from "@/db";


export const createBoard = async (title, color, userId) => {
    try {
        const result = await db.insert(boards)
            .values({
                title: title || "Untitled",
                color: color || '#3490dc',
                userId,
            })
            .returning();

        const boardId = result[0].id;
        // revalidatePath(`/auto-board/${boardId}`);

        return {
            data: result[0],
            status: 201,
            statusText: 'Created',
            error: null,
        };
    } catch (error) {
        console.error('Error creating board:', error);
        return {
            error: error.message,
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
        };
    }
};

export const createBoardColumn = async (boardId, label,dataField, order) => {
    try {
        const result = await db.insert(columns).values({boardId, label,dataField, order})
        revalidatePath(`/auto-board/${boardId}`);
        return {
            data: result[0],
            status: 201,
            statusText: 'Created',
            error: null,
        }
    } catch (error) {
        return {
            error: error.message,
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
        }
    }
};


export const createTask = async ({
                                           boardId,
                                           columnId,
                                           description,
                                           priority,
                                           progress,
                                           startDate,
                                           dueDate,
                                           tags,
                                           swimlane,
                                           status,
                                       }) => {

    try {
        const result = await db.insert(tasks).values({
            boardId,
            columnId,
            description,
            priority,
            progress,
            startDate,
            dueDate,
            tags,
            swimlane,
            status,
        });
        // }).returning();
        revalidatePath(`/auto-board/${boardId}`);
        return {
            data: result[0],
            status: 201,
            statusText: 'Created',
            error: null,
        }
    } catch (error) {
        return {
            error: error.message,
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
        }
    }
};

