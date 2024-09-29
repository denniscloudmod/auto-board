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


export async function editTask(taskId, taskData) {
    const updatedTask = {
        title: taskData.text,
        description: taskData.description,
        priority: taskData.priority,
        progress: taskData.progress,
        startDate: new Date(taskData.startDate),
        dueDate: new Date(taskData.dueDate),
        tags: JSON.stringify(taskData.tags),
        userId: taskData.userId,
        status: taskData.status,
    };

    await db.update(tasks).set(updatedTask).where(eq(tasks.id, taskId));

    // Handle checklist updates
    if (taskData.checklist) {
        await db.delete(checklists).where(eq(checklists.taskId, taskId));
        const checklistItems = taskData.checklist.map((item) => ({
            // id: uuidv4(),
            taskId,
            text: item.text,
            completed: item.completed,
        }));
        await db.insert(checklists).values(checklistItems);
    }

    return { id: taskId, ...taskData };
}

export async function listTasksAction(boardId) {
    try {
        const tasksList = await db.select().from(tasks).where(eq(tasks.boardId, boardId));
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

// export async function listTasksAction(boardId) {
//     try {
//         const tasksWithChecklists = await db
//             .select({
//                 id: tasks.id,
//                 boardId: tasks.boardId,
//                 columnId: tasks.columnId,
//                 text: tasks.text,
//                 description: tasks.description,
//                 priority: tasks.priority,
//                 progress: tasks.progress,
//                 startDate: tasks.startDate,
//                 dueDate: tasks.dueDate,
//                 color: tasks.color,
//                 tags: tasks.tags,
//                 swimlane: tasks.swimlane,
//                 userId: tasks.userId,
//                 status: tasks.status,
//                 statusLabel: tasks.statusLabel,
//                 createdAt: tasks.createdAt,
//                 updatedAt: tasks.updatedAt,
//                 checklist: db
//                     .select({
//                         id: checklists.id,
//                         text: checklists.text,
//                         completed: checklists.completed,
//                     })
//                     .from(checklists)
//                     .where(eq(checklists.taskId, tasks.id)),
//             })
//             .from(tasks)
//             .where(eq(tasks.boardId, boardId));
//
//         const tasksList = tasksWithChecklists.map(task => ({
//             ...task,
//             checklist: task.checklist || [],
//         }));
//
//         console.log('tasksList', tasksList);
//     } catch (error) {
//         console.error('Error listing tasks:', error);
//         return {
//             data: null,
//             error: error.message || 'Internal Server Error',
//             success: false,
//         };
//     }
// }


// export async function listTasksAction(boardId) {
//     try {
//         const tasksWithChecklists = await db
//             .select({
//                 id: tasks.id,
//                 text: tasks.text,
//                 description: tasks.description,
//                 status: tasks.status,
//                 priority: tasks.priority,
//                 progress: tasks.progress,
//                 startDate: tasks.startDate,
//                 dueDate: tasks.dueDate,
//                 userId: tasks.userId,
//                 tags: tasks.tags,
//                 color: tasks.color,
//                 swimlane: tasks.swimlane,
//                 // checklist: db.jsonAgg(db.selectDistinct({
//                 //     id: checklists.id,
//                 //     text: checklists.text,
//                 //     completed: checklists.completed
//                 // }).from(checklists).where(eq(checklists.taskId, tasks.id))).as('checklist')
//             })
//             .from(tasks)
//             .where(eq(tasks.boardId, boardId))
//             .groupBy(tasks.id);
//
//         const formattedTasks = tasksWithChecklists.map(task => ({
//             ...task,
//             checklist: task.checklist[0] ? task.checklist : [],
//             tags: task.tags ? task.tags.split(',') : [],
//             startDate: task.startDate ? new Date(task.startDate) : null,
//             dueDate: task.dueDate ? new Date(task.dueDate) : null,
//         }));
//
//         console.log('tasksList', formattedTasks);
//
//         return {
//             data: formattedTasks,
//             error: null,
//             success: true,
//         };
//     } catch (error) {
//         console.error('Error listing tasks:', error);
//         return {
//             data: null,
//             error: error.message || 'Internal Server Error',
//             success: false,
//         };
//     }
// }

export async function editTaskAction(taskId, taskData) {
    try {
        const updatedTask = await db.update(tasks)
            .set({
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
                columnId: taskData.column.id,
                color: taskData.color,
                checklist: JSON.stringify(taskData.checklist),
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


export async function addComment(taskId, commentData) {
    const newComment = {
        id: uuidv4(),
        taskId,
        userId: commentData.userId,
        text: commentData.text,
        time: new Date(),
    };

    await db.insert(comments).values(newComment);

    return newComment;
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

export async function deleteTask(taskId) {
    await db.delete(tasks).where(eq(tasks.id, taskId));
    return { success: true };
}