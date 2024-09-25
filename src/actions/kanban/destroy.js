"use server"

import {revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { boards } from "@/db/schema";

import { eq } from "drizzle-orm";

export const deleteBoard = async (boardId) => {
    try {
        await db.delete(boards).where(eq(boards.id, boardId)).execute();
        //revalidatePath(`/auto-board/${boardId}`);
        //redirect('/kanban');
    } catch (error) {
        console.error('Error deleting board:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
        };
    }
}
