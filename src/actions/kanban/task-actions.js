'use server';

import {and, eq} from 'drizzle-orm';
import {db} from "@/db";
import {checklists, comments, tasks} from "@/db/schema";

export async function addTaskAction(boardId, taskData) {
    try {
        const newTask = await db.insert(tasks).values({
            boardId,
            text: taskData.text,
            description: taskData.description,
            priority: taskData.priority,
            progress: taskData.progress,
            startDate: taskData.startDate,
            dueDate: taskData.dueDate,
            tags: JSON.stringify(taskData.tags),
            userId: taskData.userId,
            status: taskData.status,
            statusLabel: taskData.statusLabel,
            color: taskData.color,
        }).returning();

        if (taskData.checklist) {
            console.log('taskData.checklist', taskData.checklist);
            const checklistItems = taskData.checklist.map((item) => ({
                taskId: newTask[0].id,
                text: item.text,
                completed: item.completed,
            }));

            const checklistResult = await db.insert(checklists).values(checklistItems);
            console.log('checklistResult', checklistResult);
        }

        if (taskData.comments && taskData.comments.length > 0) {
            console.log('taskData.comments', taskData.comments);
            const commentItems = taskData.comments.map((comment) => ({
                taskId: newTask[0].id,
                userId: comment.userId || 1,
                text: comment.text,
                time: new Date(comment.time),
            }));
            const commentsResult = await db.insert(comments).values(commentItems);
            console.log('commentsResult', commentsResult);
        }

        console.log('newTask data', newTask);
        console.log('newTask data 2', newTask);

        return {
            data: newTask[0],
            error: null,
            success: true,
        };
    } catch (error) {
        console.error('Error adding task:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
            success: false,
        };
    }
}


// export async function editTask(taskId, taskData) {
//     const updatedTask = {
//         title: taskData.text,
//         description: taskData.description,
//         priority: taskData.priority,
//         progress: taskData.progress,
//         startDate: new Date(taskData.startDate),
//         dueDate: new Date(taskData.dueDate),
//         tags: JSON.stringify(taskData.tags),
//         userId: taskData.userId,
//         status: taskData.status,
//     };
//
//     await db.update(tasks).set(updatedTask).where(eq(tasks.id, taskId));
//
//     // Handle checklist updates
//     if (taskData.checklist) {
//         await db.delete(checklists).where(eq(checklists.taskId, taskId));
//         const checklistItems = taskData.checklist.map((item) => ({
//             // id: uuidv4(),
//             taskId,
//             text: item.text,
//             completed: item.completed,
//         }));
//         await db.insert(checklists).values(checklistItems);
//     }
//
//     return { id: taskId, ...taskData };
// }


export async function listTasksAction(boardId) {
    try {

        const tasksList = await db.query.tasks.findMany({
            where: eq(tasks.boardId, boardId),
            with: {
                checklist: true,
                comments: true,
            },
        });
        console.log('tasksList', tasksList);
        return {
            data: tasksList,
            error: null,
            success: true,
        };
    } catch (error) {
        console.error('Error listing tasks:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
            success: false,
        };
    }
}


export async function editTaskAction(taskId, taskData) {
    try {
        const updatedTask = await db.update(tasks)
            .set({
                text: taskData.value.text,
                description: taskData.value.description,
                priority: taskData.value.priority,
                progress: taskData.value.progress,
                startDate: taskData.value.startDate,
                dueDate: taskData.value.dueDate,
                tags: JSON.stringify(taskData.value.tags),
                userId: taskData.value.userId,
                status: taskData.value.status,
                statusLabel: taskData.value.statusLabel,
                columnId: taskData.task.column.id,
                boardId: taskData.value.boardId,
                color: taskData.value.color,
                updatedAt : new Date(),
                // checklist: JSON.stringify(taskData.checklist),
            })
            .where(eq(tasks.id, taskId))
            .returning();


        // if (taskData.checklist && taskData.checklist.length > 0) {
        //     const existingChecklist = await db.select().from(checklists).where(eq(checklists.taskId, taskId));
        //     console.log('existingChecklist', existingChecklist);
        //
        //     if (existingChecklist[0].length > 0) {
        //         const checklistUpdates = taskData.checklist.map((item, index) =>
        //             db.update(checklists)
        //                 .set({
        //                     text: item.text,
        //                     completed: item.completed
        //                 })
        //                 .where(and(
        //                     eq(checklists.taskId, taskId),
        //                     eq(checklists.id, existingChecklist[index]?.id),
        //                 ))
        //         );
        //
        //         const updatedChecklistResult = await Promise.all(checklistUpdates);
        //         console.log('updatedChecklistResult', updatedChecklistResult);
        //         if (taskData.checklist.length > existingChecklist[0].length) {
        //             const newItems = taskData.checklist.slice(existingChecklist[0].length);
        //             const newChecklistItems = newItems.map(item => ({
        //                 taskId: taskId,
        //                 text: item.text,
        //                 completed: item.completed
        //             }));
        //             const insertedNewItems = await db.insert(checklists).values(newChecklistItems);
        //             console.log('insertedNewItems', insertedNewItems);
        //         }
        //     } else {
        //         const newChecklistItems = taskData.checklist.map(item => ({
        //             taskId: taskId,
        //             text: item.text,
        //             completed: item.completed
        //         }));
        //         const insertedChecklist = await db.insert(checklists).values(newChecklistItems);
        //         console.log('insertedChecklist', insertedChecklist);
        //     }
        // }
        //


        // if(taskData.checklist && taskData.checklist.length > 0) {
        //     const checklistItems = taskData.checklist.map((item) => ({
        //         text: item.text,
        //         completed: item.completed,
        //     }));
        //     const updatedChecklistResult = await db.update(checklists).set(checklistItems).where(eq(checklists.taskId, taskId)).returning();
        //     console.log('updatedChecklistResult', updatedChecklistResult);
        // }

        // if (taskData.checklist) {
        //     console.log('taskData.checklist', taskData.checklist);
        //     const checklistItems = taskData.checklist.map((item) => ({
        //         taskId: newTask[0].id,
        //         text: item.text,
        //         completed: item.completed,
        //     }));
        //
        //     const checklistResult = await db.insert(checklists).values(checklistItems);
        //     console.log('checklistResult', checklistResult);
        // }


        return {
            data: updatedTask[0],
            error: null,
            success: true,
        }
    } catch (error) {
        console.error('Error editing task:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
            success: false,
        };
    }
}

export async function deleteTaskAction(taskId) {
    try {
        await db.delete(tasks).where(eq(tasks.id, taskId));
        return {
            data: null,
            error: null,
            success: true,
        };
    } catch (error) {
        console.error('Error deleting task:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
            success: false,
        };
    }
}

export async function addCommentAction(taskId, commentData) {
    try {
        const newComment = await db.insert(comments).values({
            taskId,
            userId: crypto.randomUUID(),
            // userId: commentData.userId,
            text: commentData.text,
            time: commentData.time,
        }).returning();

        return {
            data: newComment[0],
            error: null,
            success: true,
        };
    } catch (error) {
        console.error('Error adding comment:', error);
        return {
            data: null,
            error: error.message || 'Internal Server Error',
            success: false,
        };
    }
}

export async function copyTask(taskData) {
    // const newTaskId = uuidv4();
    const newTask = {
        ...taskData,
        // id: newTaskId,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await db.insert(tasks).values(newTask);

    if (taskData.checklist) {
        const checklistItems = taskData.checklist.map((item) => ({
            // id: uuidv4(),
            taskId: newTaskId,
            text: item.text,
            completed: item.completed,
        }));
        await db.insert(checklists).values(checklistItems);
    }

    if (taskData.comments) {
        const newComments = taskData.comments.map((comment) => ({
            ...comment,
            // id: uuidv4(),
            taskId: newTaskId,
        }));
        await db.insert(comments).values(newComments);
    }

    return newTask;
}
