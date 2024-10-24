// "use server";
//
// import {boards, checklists, columns, comments, tasks} from "@/db/schema";
// import {db} from "@/db";
// import {and, eq} from 'drizzle-orm';
// import {revalidatePath} from "next/cache";
//
//
// export const createBoard = async (title, color, userId) => {
//     try {
//         const result = await db.insert(boards)
//             .values({
//                 title: title || "Untitled",
//                 color: color || '#3490dc',
//                 userId,
//             })
//             .returning();
//
//         const boardId = result[0].id;
//
//         return {
//             data: result[0],
//             status: 201,
//             statusText: 'Created',
//             error: null,
//         };
//     } catch (error) {
//         console.error('Error creating board:', error);
//         return {
//             error: error.message,
//             data: null,
//             status: 500,
//             statusText: 'Internal Server Error',
//         };
//     }
// };
//
//
// export async function addTaskAction(boardId, taskData) {
//     try {
//         const newTask = await db.insert(tasks).values({
//             boardId,
//             text: taskData.text,
//             description: taskData.description,
//             priority: taskData.priority,
//             progress: taskData.progress,
//             startDate: taskData.startDate,
//             dueDate: taskData.dueDate,
//             tags: JSON.stringify(taskData.tags),
//             userId: taskData.userId,
//             status: taskData.status,
//             statusLabel: taskData.statusLabel,
//             color: taskData.color,
//         }).returning();
//
//         if (taskData.checklist) {
//             console.log('taskData.checklist', taskData.checklist);
//             const checklistItems = taskData.checklist.map((item) => ({
//                 taskId: newTask[0].id,
//                 text: item.text,
//                 completed: item.completed,
//             }));
//
//             const checklistResult = await db.insert(checklists).values(checklistItems);
//             console.log('checklistResult', checklistResult);
//         }
//
//         if (taskData.comments && taskData.comments.length > 0) {
//             console.log('taskData.comments', taskData.comments);
//             const commentItems = taskData.comments.map((comment) => ({
//                 taskId: newTask[0].id,
//                 userId: comment.userId || 1,
//                 text: comment.text,
//                 time: new Date(comment.time),
//             }));
//             const commentsResult = await db.insert(comments).values(commentItems);
//             console.log('commentsResult', commentsResult);
//         }
//
//         console.log('newTask data', newTask);
//         console.log('newTask data 2', newTask);
//
//         return {
//             data: newTask[0],
//             error: null,
//             success: true,
//         };
//     } catch (error) {
//         console.error('Error adding task:', error);
//         return {
//             data: null,
//             error: error.message || 'Internal Server Error',
//             success: false,
//         };
//     }
// }
//
//
// export async function listTasksAction(boardId) {
//     try {
//
//         const tasksList = await db.query.tasks.findMany({
//             where: eq(tasks.boardId, boardId),
//             with: {
//                 checklist: true,
//                 comments: true,
//             },
//         });
//         console.log('tasksList', tasksList);
//         return {
//             data: tasksList,
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
//
// export async function addColumn(boardId, label, dataField, order) {
//     try {
//         const newColumn = await db.insert(columns).values({
//             boardId,
//             label,
//             dataField,
//             order,
//         }).returning()
//         revalidatePath(`/auto-board/${boardId}`)
//         return newColumn[0]
//     } catch (error) {
//         console.error('Failed to create column:', error)
//         throw new Error('Failed to create column')
//     }
// }
//
