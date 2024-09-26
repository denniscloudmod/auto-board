'use server'

import {boards, columns} from "@/db/schema";
import {db} from "@/db";
import {asc, eq} from "drizzle-orm";

export const getBoards = async () => {
// export const getBoards = async (userId) => {
    try {
        // const result = await db.select().from(boards).where(eq(boards.userId, "e16575cd-e9d3-47d5-b3ba-d3ef612f5683"));
        // const result = await db.select().from(boards).where(eq(boards.userId, userId));
        const result = await db.select().from(boards).orderBy(asc(boards.createdAt))
        return {data: result, error: null}
    } catch (error) {
        console.error('Error fetching boards:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
        };
    }
}


export const getBoard = async (id) => {
    try {
        const result = await db.select().from(boards).where(eq(boards.id, id)).limit(1);
        return {data: result[0], error: null}

    } catch (error) {
        console.error('Error fetching board:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
        };
    }
}

export const getBoardColumns = async (boardId) => {
    try {
        // const result = await db.select().from(columns);
        const result = await db.select().from(columns).where(eq(columns.boardId, boardId)).orderBy(columns.order);
        // console.log('Col Result', result)

        return {data: result, error: null}

    } catch (error) {
        console.error('Error fetching board columns:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
        };
    }
}