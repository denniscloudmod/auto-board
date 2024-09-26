"use server";

import {revalidatePath} from "next/cache";
import {eq} from "drizzle-orm";
import {db} from "@/db";
import {columns} from "@/db/schema";

export async function addColumn(boardId, label, dataField, order) {
    try {
        const newColumn = await db.insert(columns).values({
            boardId,
            label,
            dataField,
            order,
        }).returning()
        revalidatePath(`/auto-board/${boardId}`)
        return newColumn[0]
    } catch (error) {
        console.error('Failed to create column:', error)
        throw new Error('Failed to create column')
    }
}

export async function updateColumn(id, label, dataField, order) {
    try {
        const updatedColumn = await db.update(columns)
            .set({ label, dataField, order, updatedAt: new Date() })
            .where(eq(columns.id, id))
            .returning()
        revalidatePath(`/auto-board/${updatedColumn[0].boardId}`)
        // console.log("updatedColumn", updatedColumn)
        return {data: updatedColumn[0], error: null}
    } catch (error) {
        // console.error('Failed to update column:', error)
        // throw new Error('Failed to update column')
        return {data: null, error: error.message || 'Internal Server Error', status: 500}
    }
}

export async function deleteColumn(id) {
    try {
        const deletedColumn = await db.delete(columns).where(eq(columns.id, id)).returning()
        revalidatePath(`/auto-board/${deletedColumn[0].boardId}`)
        // console.log("Remove c", deletedColumn[0])
        return {data: deletedColumn[0], error: null}
    } catch (error) {
        // console.error('Failed to delete column:', error)
        // throw new Error('Failed to delete column')
        return {data: null, error: error.message || 'Internal Server Error', status: 500}
    }
}

export async function reorderColumn(id, newOrder) {
    try {
        const updatedColumn = await db.update(columns)
            .set({ order: newOrder, updatedAt: new Date() })
            .where(eq(columns.id, id))
            .returning()
        revalidatePath(`/auto-board/${updatedColumn[0].boardId}`)
        // console.log("updatedColumn", updatedColumn)
        return {data: updatedColumn[0], error: null}
    } catch (error) {
        // console.error('Failed to reorder column:', error)
        // throw new Error('Failed to reorder column')
        return {data: null, error: error.message || 'Internal Server Error', status: 500}
    }
}

export async function getColumns(boardId) {
    try {
        const result = await db.select().from(columns).where(eq(columns.boardId, boardId)).orderBy(columns.order)
        // console.log("board columns", result)
        return {data: result, error: null}

    } catch (error) {
        console.error('Error fetching board columns:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
        };
    }
    // } catch (error) {
    //     console.error('Failed to fetch columns:', error)
    //     throw new Error('Failed to fetch columns')
    // }
}