"use server";

import {db} from "@/db";
import {boards, columns, tasks} from "@/db/schema";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";

export const updateBoard = async (boardId, title, color) => {
    try {
      const result = db.update(boards)
          .set({
              title,
              color,
              updatedAt: new Date()
          })
          .where(eq(boards.id, boardId))
          // .returning();

      return {
          data: result[0],
          data2: result,
          status: 200,
          statusText: 'Updated',
          error: null,
      };
  } catch (error) {
      console.error('Error updating board:', error);
      return {
          error: error,
          data: null,
          status: 500,
          statusText: 'Internal Server Error',
      };
  }
};

const updateBoardColumn = async (id, label, dataField, order) => {
    try {
        const result = await db.update(columns).set(
            {
                 label ,dataField , order, updatedAt: new Date()
            }
        ).where(eq(columns.id, id))

        const resultData = result[0]

        revalidatePath(`/auto-board/${resultData.boardId}`);

        return {
            data: resultData,
            status: 201,
            statusText: 'Created',
            error: null,
        };
    } catch (error) {
        console.error('Error updating board:', error);
        return {
            error: error.message,
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
        };
    }
}


const updateTaskColumn = async (
    id,
    title,
    columnId,
    description,
    priority,
    progress,
    startDate,
    dueDate,
    tags,
    swimlane,
    status,
    ) => {
    try {
        const result = await db.update(tasks).set(
            {
            columnId,
            title,
            description,
            priority,
            progress,
            startDate,
            dueDate,
            tags,
            swimlane,
            status, updatedAt: new Date()
            }
        ).where(eq(tasks.id, id))

        const resultData = result[0]

        console.log('resultData', resultData)

       // revalidatePath(`/auto-board/${resultData.boardId}`);

        return {
            data: resultData,
            status: 201,
            statusText: 'Created',
            error: null,
        };
    } catch (error) {
        console.error('Error tasks:', error);
        return {
            error: error.message,
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
        };
    }
}