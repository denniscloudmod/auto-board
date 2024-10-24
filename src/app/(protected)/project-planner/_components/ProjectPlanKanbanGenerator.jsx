// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Loader2 } from 'lucide-react';
// import {useToast} from "@/hooks/use-toast";
// import {addColumn, createBoard} from "@/actions/kanban/tst";
//
// const MarkdownKanbanParser = ({ markdownData, userId }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [parsedData, setParsedData] = useState(null);
//     const { toast } = useToast();
//
//     const createKanbanBoard = async () => {
//         setIsLoading(true);
//         try {
//             const lines = markdownData.split('\n').filter(line => line.trim());
//             let currentBoard = null;
//             let currentTask = null;
//             let currentSection = null;
//
//             // Parse board title
//             const boardTitle = lines.find(line => line.trim().startsWith('# '))?.substring(2).trim();
//             if (!boardTitle) {
//                 toast({
//                     title: 'Error', description: 'No board title found in markdown', variant: 'destructive'
//                 })
//                 throw new Error('No board title found in markdown');
//             }
//
//             // Create board
//             const boardResult = await createBoard(boardTitle, '#3490dc', userId);
//             if (boardResult.error) {
//                 toast({title: 'Error', description: boardResult.error, variant: 'destructive'})
//                 throw new Error(boardResult.error);
//             }
//
//             console.log('Board created:', boardResult.data)
//             console.log('Board created2:', boardResult)
//
//             const boardId = boardResult.data.id;
//
//             console.log('boardId', boardId)
//
//             // Default columns
//             const defaultColumns = [
//                 { label: 'To Do', dataField: 'todo', order: 1 },
//                 { label: 'Doing', dataField: 'doing', order: 2 },
//                 { label: 'Done', dataField: 'done', order: 3 }
//             ];
//
//             const columns = await Promise.all(
//                 defaultColumns.map(col =>
//                     addColumn(boardId, col.label, col.dataField, col.order)
//                 )
//             );
//
//             // Parsing and creating tasks
//             const tasks = [];
//             let currentTaskData = null;
//
//             for (const line of lines) {
//                 const trimmedLine = line.trim();
//
//                 if (trimmedLine.startsWith('**')) {
//                 // if (trimmedLine.startsWith('**') && !trimmedLine.includes('System')) {
//                     // Saving my previous task if exists
//                     if (currentTaskData) {
//                         tasks.push(currentTaskData);
//                     }
//
//                     const taskText = trimmedLine.replace(/\*\*/g, '').trim();
//                     currentTaskData = {
//                         text: taskText,
//                         description: '',
//                         boardId,
//                         // data_field: 'todo',
//                         // label: 'To Do',
//                         status: 'todo',
//                         statusLabel: 'To Do',
//                         userId,
//                         tags: [],
//                         priority: 'medium',
//                         progress: 0,
//                     };
//                     currentSection = taskText;
//                 } else if (trimmedLine.startsWith('* ') && currentSection) {
//                     const description = trimmedLine.substring(2).trim();
//                     tasks.push({
//                         text: description,
//                         description: `Part of ${currentSection}`,
//                         boardId,
//                         status: 'todo',
//                         statusLabel: 'To Do',
//                         userId,
//                         tags: [],
//                         priority: 'medium',
//                         progress: 0,
//                     });
//                 }
//             }
//
//             // Add final task if exists
//             if (currentTaskData) {
//                 tasks.push(currentTaskData);
//             }
//
//             // Create all tasks
//             await Promise.all(
//                 tasks.map(taskData => addTaskAction(boardId, taskData))
//             );
//
//             // Fetch all created tasks
//             const tasksResult = await listTasksAction(boardId);
//
//             setParsedData({
//                 board: boardResult.data,
//                 columns,
//                 tasks: tasksResult.data
//             });
//
//             toast({
//                 title: "Success!",
//                 description: "Kanban board created successfully",
//                 variant: "default",
//             });
//
//         } catch (error) {
//             console.error('Error creating Kanban board:', error);
//             toast({
//                 title: "Error",
//                 description: error.message || "Failed to create Kanban board",
//                 variant: "destructive",
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const renderParsedData = () => {
//         if (!parsedData) return null;
//
//         return (
//             <div className="space-y-4">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>{parsedData.board.title}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="grid grid-cols-3 gap-4">
//                             {parsedData.columns.map(column => (
//                                 <div key={column.id} className="border rounded-lg p-4">
//                                     <h3 className="font-medium mb-2">{column.label}</h3>
//                                     <div className="space-y-2">
//                                         {parsedData.tasks
//                                             .filter(task => task.status === column.dataField)
//                                             .map(task => (
//                                                 <div key={task.id} className="bg-white p-2 rounded shadow">
//                                                     <p className="font-medium">{task.text}</p>
//                                                     {task.description && (
//                                                         <p className="text-sm text-gray-600">{task.description}</p>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         );
//     };
//
//     return (
//         <div className="space-y-4">
//             <Button
//                 onClick={createKanbanBoard}
//                 disabled={isLoading}
//             >
//                 {isLoading ? (
//                     <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Creating Board...
//                     </>
//                 ) : (
//                     'Create Kanban Board'
//                 )}
//             </Button>
//             {renderParsedData()}
//         </div>
//     );
// };
//
// export default MarkdownKanbanParser;


// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Loader2 } from 'lucide-react';
// import {addTaskAction, createBoard, listTasksAction} from "@/actions/kanban/tst";
// import {useToast} from "@/hooks/use-toast";
// import {updateProjectPlan} from "@/actions/project-plan/update";
// import {addColumn} from "@/actions/kanban/column-actions";
//
// const ProjectPlanKanbanParser = ({ projectPlanData, userId }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [parsedData, setParsedData] = useState(null);
//     const { toast } = useToast();
//
//     const createKanbanFromProjectPlan = async () => {
//         setIsLoading(true);
//         try {
//             const { id: projectPlanId, content } = projectPlanData;
//             const lines = content.split('\n').filter(line => line.trim());
//
//             // Parsing board title
//             const boardTitle = lines.find(line => line.trim().startsWith('# '))?.substring(2).trim();
//             if (!boardTitle) {
//                 toast({
//                     title: 'Error', description: 'No board title found in markdown', variant: 'destructive'
//                 })
//                 throw new Error('No board title found in project plan');
//             }
//
//             // Creating board
//             const boardResult = await createBoard(boardTitle, '#3490dc', userId);
//             if (boardResult.error) {
//                 toast({title: 'Error', description: boardResult.error, variant: 'destructive'})
//                 throw new Error(boardResult.error);
//             }
//
//             const boardId = boardResult.data.id;
//
//             console.log("boardResult", boardResult)
//             console.log("boardId", boardId)
//
//
//             // Updating the project plan with board reference
//             const updateResult = await updateProjectPlan({
//                 id: projectPlanId,
//                 has_kanban: 1,
//                 boardId: boardId,
//             });
//
//             if (updateResult.error) {
//                 throw new Error(updateResult.error);
//             }
//
//             // Create default columns
//             const defaultColumns = [
//                 { label: 'To Do', dataField: 'todo', order: 1 },
//                 { label: 'Doing', dataField: 'doing', order: 2 },
//                 { label: 'Done', dataField: 'done', order: 3 }
//             ];
//
//             const columns = await Promise.all(
//                 defaultColumns.map(col =>
//                     addColumn(boardId, col.label, col.dataField, col.order)
//                 )
//             );
//
//             // Parsimg and creatin tasks
//             const tasks = [];
//             let currentTaskData = null;
//             let currentSection = null;
//
//             for (const line of lines) {
//                 const trimmedLine = line.trim();
//
//                 if (trimmedLine.startsWith('**')) {
//                     // Saving previous task if exists
//                     if (currentTaskData) {
//                         tasks.push(currentTaskData);
//                     }
//
//                     const taskText = trimmedLine.replace(/\*\*/g, '').trim();
//                     currentTaskData = {
//                         text: taskText,
//                         description: '',
//                         boardId,
//                         status: 'todo',
//                         statusLabel: 'To Do',
//                         userId,
//                         tags: [],
//                         priority: 'medium',
//                         progress: 0,
//                     };
//                     currentSection = taskText;
//                 } else if (trimmedLine.startsWith('* ') && currentSection) {
//                     const description = trimmedLine.substring(2).trim();
//                     tasks.push({
//                         text: description,
//                         description: `Part of ${currentSection}`,
//                         boardId,
//                         status: 'todo',
//                         statusLabel: 'To Do',
//                         userId,
//                         tags: [],
//                         priority: 'medium',
//                         progress: 0,
//                     });
//                 }
//             }
//
//             // Adding final task if exists
//             if (currentTaskData) {
//                 tasks.push(currentTaskData);
//             }
//
//             // Now Creating all tasks
//             await Promise.all(
//                 tasks.map(taskData => addTaskAction(boardId, taskData))
//             );
//
//             // Fetch all created tasks
//             const tasksResult = await listTasksAction(boardId);
//
//             setParsedData({
//                 board: boardResult.data,
//                 columns,
//                 tasks: tasksResult.data
//             });
//
//             toast({
//                 title: "Success!",
//                 description: "Kanban board created and project plan updated successfully",
//                 variant: "default",
//             });
//
//         } catch (error) {
//             console.error('Error creating Kanban board:', error);
//             toast({
//                 title: "Error",
//                 description: error.message || "Failed to create Kanban board",
//                 variant: "destructive",
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const renderParsedData = () => {
//         if (!parsedData) return null;
//
//         return (
//             <div className="space-y-4">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>{parsedData.board.title}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="grid grid-cols-3 gap-4">
//                             {parsedData.columns.map(column => (
//                                 <div key={column.id} className="border rounded-lg p-4">
//                                     <h3 className="font-medium mb-2">{column.label}</h3>
//                                     <div className="space-y-2">
//                                         {parsedData.tasks
//                                             .filter(task => task.status === column.dataField)
//                                             .map(task => (
//                                                 <div key={task.id} className="bg-white p-2 rounded shadow">
//                                                     <p className="font-medium">{task.text}</p>
//                                                     {task.description && (
//                                                         <p className="text-sm text-gray-600">{task.description}</p>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         );
//     };
//
//     return (
//         <div className="space-y-4">
//             <Button
//                 onClick={createKanbanFromProjectPlan}
//                 disabled={isLoading || projectPlanData.has_kanban === 1}
//             >
//                 {isLoading ? (
//                     <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Creating Board...
//                     </>
//                 ) : projectPlanData.has_kanban === 1 ? (
//                     'Kanban Board Already Created'
//                 ) : (
//                     'Create Kanban Board'
//                 )}
//             </Button>
//             {renderParsedData()}
//         </div>
//     );
// };
//
// export default ProjectPlanKanbanParser;



import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {useToast} from "@/hooks/use-toast";
import {createBoard} from "@/actions/kanban/create";
import {updateProjectPlan} from "@/actions/project-plan/update";
import {addColumn} from "@/actions/kanban/column-actions";
import {addTaskAction, listTasksAction} from "@/actions/kanban/task-actions";
import {useRouter} from "next/navigation";
import {markDownSampleData} from "@/utils/constants";

const ProjectPlanKanbanGenerator = ({ projectPlanData, userId }) => {
// const ProjectPlanKanbanGenerator = ({ projectPlanId, content, userId }) => {

    const router = useRouter();
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [parsedData, setParsedData] = useState(null);



    const createKanbanFromProjectPlan = async () => {
        setIsLoading(true);
        try {
            const { id: projectPlanId, content } = projectPlanData;
            const lines = content.split('\n').filter(line => line.trim());

            // Parsing board title
            const boardTitle = lines.find(line => line.trim().startsWith('# '))?.substring(2).trim();
            if (!boardTitle) {
                toast({
                    title: 'Error', description: 'No board title found in markdown', variant: 'destructive'
                })
                throw new Error('No board title found in project plan');
            }

            const randomBgColor = ()=>  {
                const colors = [
                    'bg-gradient-to-r from-green-400 to-blue-500',
                    'bg-gradient-to-r from-red-400 to-yellow-400',
                    'bg-gradient-to-r from-yellow-400 to-green-400',
                    'bg-gradient-to-r from-green-400 to-blue-400',
                    'bg-gradient-to-r from-blue-400 to-indigo-400',
                    'bg-gradient-to-r from-indigo-400 to-purple-400',
                    'bg-gradient-to-r from-purple-400 to-pink-400',
                    'bg-gradient-to-r from-pink-400 to-red-400'
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            // Create board
            const boardResult = await createBoard(boardTitle, randomBgColor(), userId);
            // const boardResult = await createBoard(boardTitle, 'bg-gradient-to-r from-green-400 to-blue-500', userId);
            if (boardResult.error) {
                toast({title: 'Error', description: boardResult.error, variant: 'destructive'})
                throw new Error(boardResult.error);
            }

            const boardId = boardResult.data.id;



            // Updating project plan with board reference
            const updateResult = await updateProjectPlan({
                id: projectPlanId,
                has_kanban: 1,
                boardId: boardId,
                updatedAt : new Date()
            });

            console.log("updateProjectPlan Result", updateResult)

            if (updateResult.error) {
                toast({title: 'Error', description: updateResult.error, variant: 'destructive'})
                throw new Error(updateResult.error);
            }

            // Creating default columns
            const defaultColumns = [
                { label: 'To Do', dataField: 'todo', order: 1 },
                { label: 'Doing', dataField: 'done', order: 2 },
                { label: 'Done', dataField: 'done', order: 3 }
            ];

            const columns = await Promise.all(
                defaultColumns.map(col =>
                    addColumn(boardId, col.label, col.dataField, col.order)
                )
            );

            // Parsing and creating tasks
            const tasksByCategory = new Map();
            let currentCategory = null;

            // First pass: collect all descriptions by category
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                if (line.startsWith('**') && line.endsWith(':**')) {
                    currentCategory = line.replace(/\*\*/g, '').replace(':', '').trim();
                }
                else if (line.startsWith('* ') && currentCategory) {
                    const taskText = line.substring(2).trim();

                    if (!tasksByCategory.has(currentCategory)) {
                        tasksByCategory.set(currentCategory, []);
                    }
                    tasksByCategory.get(currentCategory).push(taskText);
                }
            }

            // Second pass: create final tasks with combined descriptions
            const tasks = Array.from(tasksByCategory.entries()).map(([category, descriptions]) => ({
                text: category,
                description: descriptions.join('\n• '),
                boardId,
                status: 'todo',
                statusLabel: 'To Do',
                userId,
                tags: category,
                // tags: [category],
                priority: 'medium',
                progress: 0,
            }));

            // console.log('consolidated tasks', tasks);
            // return tasks;

            // Creating all tasks
            const createdTasks = await Promise.all(
                tasks.map(taskData => addTaskAction(boardId, taskData))
            );

            console.log('createdTasks', createdTasks);

            // Fetch all created tasks
            const tasksResult = await listTasksAction(boardId);

            setParsedData({
                board: boardResult.data,
                columns,
                tasks: tasksResult.data
            });

            router.push(`/auto-board/${boardId}`)

            toast({
                title: "Success!",
                description: "Kanban board created and project plan updated successfully",
                variant: "default",
            });

        } catch (error) {
            console.error('Error creating Kanban board:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to create Kanban board",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };



    // const createKanbanFromProjectPlan = async () => {
    //     setIsLoading(true);
    //     try {
    //         const { id: projectPlanId, content } = projectPlanData;
    //         const lines = content.split('\n').filter(line => line.trim());
    //
    //         // Parsing board title
    //         const boardTitle = lines.find(line => line.trim().startsWith('# '))?.substring(2).trim();
    //         if (!boardTitle) {
    //             toast({
    //                 title: 'Error', description: 'No board title found in markdown', variant: 'destructive'
    //             })
    //             throw new Error('No board title found in project plan');
    //         }
    //
    //         // Create board
    //         const boardResult = await createBoard(boardTitle, 'bg-gradient-to-r from-green-400 to-blue-500', userId);
    //         if (boardResult.error) {
    //             toast({title: 'Error', description: boardResult.error, variant: 'destructive'})
    //             throw new Error(boardResult.error);
    //         }
    //
    //         const boardId = boardResult.data.id;
    //
    //
    //
    //         // Updating project plan with board reference
    //         const updateResult = await updateProjectPlan({
    //             id: projectPlanId,
    //             has_kanban: 1,
    //             boardId: boardId,
    //             updatedAt : new Date()
    //         });
    //
    //         console.log("updateProjectPlan Result", updateResult)
    //
    //         if (updateResult.error) {
    //             toast({title: 'Error', description: updateResult.error, variant: 'destructive'})
    //             throw new Error(updateResult.error);
    //         }
    //
    //         // Creating default columns
    //         const defaultColumns = [
    //             { label: 'To Do', dataField: 'todo', order: 1 },
    //             { label: 'Doing', dataField: 'done', order: 2 },
    //             { label: 'Done', dataField: 'done', order: 3 }
    //         ];
    //
    //         const columns = await Promise.all(
    //             defaultColumns.map(col =>
    //                 addColumn(boardId, col.label, col.dataField, col.order)
    //             )
    //         );
    //
    //         // Parsing and creating tasks
    //         const tasks = [];
    //         let currentCategory = null;
    //
    //         for (let i = 0; i < lines.length; i++) {
    //             const line = lines[i].trim();
    //
    //             // If line starts with double asterisks, it's a category
    //             if (line.startsWith('**') && line.endsWith(':**')) {
    //                 currentCategory = line.replace(/\*\*/g, '').replace(':', '').trim();
    //             }
    //             // If line starts with single asterisk and we have a category, it's a task
    //             else if (line.startsWith('* ') && currentCategory) {
    //                 const taskText = line.substring(2).trim();
    //                 tasks.push({
    //                     text: taskText,
    //                     description: currentCategory, // Use the category as the description
    //                     boardId,
    //                     status: 'todo',
    //                     statusLabel: 'To Do',
    //                     userId,
    //                     tags: [currentCategory], // Add category as a tag
    //                     priority: 'medium',
    //                     progress: 0,
    //                 });
    //             }
    //         }
    //
    //         // Creating all tasks
    //         const createdTasks = await Promise.all(
    //             tasks.map(taskData => addTaskAction(boardId, taskData))
    //         );
    //
    //         // Fetch all created tasks
    //         const tasksResult = await listTasksAction(boardId);
    //
    //         setParsedData({
    //             board: boardResult.data,
    //             columns,
    //             tasks: tasksResult.data
    //         });
    //
    //         router.push(`/auto-board/${boardId}`)
    //
    //         toast({
    //             title: "Success!",
    //             description: "Kanban board created and project plan updated successfully",
    //             variant: "default",
    //         });
    //
    //     } catch (error) {
    //         console.error('Error creating Kanban board:', error);
    //         toast({
    //             title: "Error",
    //             description: error.message || "Failed to create Kanban board",
    //             variant: "destructive",
    //         });
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    //


    // const createKanbanFromProjectPlan3 = async () => {
    //     const lines = markDownSampleData.split('\n').filter(line => line.trim());
    //     const tasks = [];
    //     let currentCategory = null;
    //
    //     for (let i = 0; i < lines.length; i++) {
    //         const line = lines[i].trim();
    //
    //         if (line.startsWith('**') && line.endsWith(':**')) {
    //             currentCategory = line.replace(/\*\*/g, '').replace(':', '').trim();
    //         }
    //         else if (line.startsWith('* ') && currentCategory) {
    //             const taskText = line.substring(2).trim();
    //             tasks.push({
    //                 text: currentCategory,
    //                 description: taskText,
    //                 boardId : '435tr34',
    //                 status: 'todo',
    //                 statusLabel: 'To Do',
    //                 userId,
    //                 tags: [currentCategory],
    //                 priority: 'medium',
    //                 progress: 0,
    //             });
    //         }
    //     }
    //
    //     console.log('all tasks', tasks)
    //
    // };

    // const createKanbanFromProjectPlan4 = async () => {
    //     const lines = markDownSampleData.split('\n').filter(line => line.trim());
    //     const tasksByCategory = new Map();
    //     let currentCategory = null;
    //
    //     // First pass: collect all descriptions by category
    //     for (let i = 0; i < lines.length; i++) {
    //         const line = lines[i].trim();
    //
    //         if (line.startsWith('**') && line.endsWith(':**')) {
    //             currentCategory = line.replace(/\*\*/g, '').replace(':', '').trim();
    //         }
    //         else if (line.startsWith('* ') && currentCategory) {
    //             const taskText = line.substring(2).trim();
    //
    //             if (!tasksByCategory.has(currentCategory)) {
    //                 tasksByCategory.set(currentCategory, []);
    //             }
    //             tasksByCategory.get(currentCategory).push(taskText);
    //         }
    //     }
    //
    //     // Second pass: create final tasks with combined descriptions
    //     const tasks = Array.from(tasksByCategory.entries()).map(([category, descriptions]) => ({
    //         text: category,
    //         description: descriptions.join('\n• '),
    //         boardId: '435tr34',
    //         status: 'todo',
    //         statusLabel: 'To Do',
    //         userId,
    //         tags: [category],
    //         priority: 'medium',
    //         progress: 0,
    //     }));
    //
    //     console.log('consolidated tasks', tasks);
    //     return tasks;
    // };

    return (
        // <Button
        //     className={`bg-black text-white px-2 py-1 rounded hover:bg-gray-500`}
        //     onClick={createKanbanFromProjectPlan}
        // >
        //     Create Autoboard
        // </Button>

    <Button
        className={`bg-black text-white px-2 py-1 rounded hover:bg-gray-500 ${projectPlanData.has_kanban === 1 && 'bg-teal-700 hover:bg-white hover:border border-teal-500 hover:text-teal-700'}`}
        onClick={projectPlanData.has_kanban === 1 ? () => router.push(`/auto-board/${projectPlanData.boardId}`) : createKanbanFromProjectPlan}
        // onClick={createKanbanFromProjectPlan}
        disabled={isLoading}
    >
        {isLoading ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Board...
            </>
        ) : projectPlanData.has_kanban === 1 ? (
            'View Kanban Board'
        ) : (
            'Create Autoboard'
        )}
    </Button>


    );
};

export default ProjectPlanKanbanGenerator;