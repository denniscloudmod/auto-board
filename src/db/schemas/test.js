// import { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const KanbanBoard = ({ boardId }) => {
//     const [columns, setColumns] = useState([]);
//
//     useEffect(() => {
//         // Fetch columns for the board
//         const fetchColumns = async () => {
//             try {
//                 const response = await axios.get(`/api/boards/${boardId}/columns`);
//                 setColumns(response.data);
//             } catch (error) {
//                 console.error('Error fetching columns:', error);
//             }
//         };
//         fetchColumns();
//     }, [boardId]);
//
//     const handleColumnAdd = async (e) => {
//         const { newColumn } = e.detail;
//         try {
//             const response = await axios.post('/api/columns', {
//                 boardId,
//                 label: newColumn.label,
//                 dataField: newColumn.dataField,
//                 order: columns.length, // Set the order to the current number of columns
//             });
//             setColumns([...columns, response.data]);
//         } catch (error) {
//             console.error('Error adding column:', error);
//         }
//     };
//
//     const handleColumnUpdate = async (e) => {
//         const { column } = e.detail;
//         try {
//             const response = await axios.put(`/api/columns`, {
//                 id: column.id,
//                 label: column.label,
//                 dataField: column.dataField,
//             });
//             setColumns(columns.map(col => col.id === response.data.id ? response.data : col));
//         } catch (error) {
//             console.error('Error updating column:', error);
//         }
//
//     };
//
//     const handleColumnRemove = async (e) => {
//         const { column } = e.detail;
//         try {
//             await axios.delete(`/api/columns`, { data: { id: column.id } });
//             setColumns(columns.filter(col => col.id !== column.id));
//         } catch (error) {
//             console.error('Error deleting column:', error);
//         }
//     };
//
//     const handleColumnReorder = async (e) => {
//         const { columns: reorderedColumns } = e.detail;
//         try {
//             const updatedColumns = await Promise.all(reorderedColumns.map((column, index) =>
//                 axios.put(`/api/columns`, { id: column.id, order: index })
//             ));
//             setColumns(updatedColumns.map(response => response.data));
//         } catch (error) {
//             console.error('Error reordering columns:', error);
//         }
//     };
//
//     return (
//         <Kanban
//             onColumnAdd={handleColumnAdd}
//             onColumnRemove={handleColumnRemove}
//             onColumnUpdate={handleColumnUpdate}
//             onColumnReorder={handleColumnReorder}
//         />
//     );
// };
//
// export default KanbanBoard;
//
//
//
//
//
//
// // app/actions/columnActions.ts
// 'use server'
//
// import { db } from '@/lib/db'
// import { columns } from '@/lib/schema'
// import { eq } from 'drizzle-orm'
// import { revalidatePath } from 'next/cache'
//
// export async function addColumn(boardId: string, label: string, dataField: string, order: number) {
//   try {
//     const newColumn = await db.insert(columns).values({
//       boardId,
//       label,
//       dataField,
//       order,
//     }).returning()
//     revalidatePath(`/boards/${boardId}`)
//     return newColumn[0]
//   } catch (error) {
//     console.error('Failed to create column:', error)
//     throw new Error('Failed to create column')
//   }
// }
//
// export async function updateColumn(id: number, label: string, dataField: string, order: number) {
//   try {
//     const updatedColumn = await db.update(columns)
//       .set({ label, dataField, order, updatedAt: new Date() })
//       .where(eq(columns.id, id))
//       .returning()
//     revalidatePath(`/boards/${updatedColumn[0].boardId}`)
//     return updatedColumn[0]
//   } catch (error) {
//     console.error('Failed to update column:', error)
//     throw new Error('Failed to update column')
//   }
// }
//
// export async function deleteColumn(id: number) {
//   try {
//     const deletedColumn = await db.delete(columns).where(eq(columns.id, id)).returning()
//     revalidatePath(`/boards/${deletedColumn[0].boardId}`)
//     return deletedColumn[0]
//   } catch (error) {
//     console.error('Failed to delete column:', error)
//     throw new Error('Failed to delete column')
//   }
// }
//
// export async function reorderColumn(id: number, newOrder: number) {
//   try {
//     const updatedColumn = await db.update(columns)
//       .set({ order: newOrder, updatedAt: new Date() })
//       .where(eq(columns.id, id))
//       .returning()
//     revalidatePath(`/boards/${updatedColumn[0].boardId}`)
//     return updatedColumn[0]
//   } catch (error) {
//     console.error('Failed to reorder column:', error)
//     throw new Error('Failed to reorder column')
//   }
// }
//
// export async function getColumns(boardId: string) {
//   try {
//     const boardColumns = await db.select().from(columns).where(eq(columns.boardId, boardId)).orderBy(columns.order)
//     return boardColumns
//   } catch (error) {
//     console.error('Failed to fetch columns:', error)
//     throw new Error('Failed to fetch columns')
//   }
// }
//
//
//
// 'use client'
//
// import { useState, useEffect } from 'react'
// import Kanban from 'smart-webcomponents-react/kanban'
// import { addColumn, updateColumn, deleteColumn, reorderColumn, getColumns } from '../actions/columnActions'
//
// export default function KanbanBoard({ boardId }: { boardId: string }) {
//   const [columns, setColumns] = useState([])
//
//   useEffect(() => {
//     fetchColumns()
//   }, [])
//
//   const fetchColumns = async () => {
//     try {
//       const data = await getColumns(boardId)
//       setColumns(data)
//     } catch (error) {
//       console.error('Error fetching columns:', error)
//     }
//   }
//
//   const handleColumnAdd = async (e: any) => {
//     const { newColumn } = e.detail
//     try {
//       await addColumn(boardId, newColumn.label, newColumn.dataField, columns.length)
//       fetchColumns()
//     } catch (error) {
//       console.error('Error adding column:', error)
//     }
//   }
//
//   const handleColumnUpdate = async (e: any) => {
//     const { column } = e.detail
//     try {
//       await updateColumn(column.id, column.label, column.dataField, column.order)
//       fetchColumns()
//     } catch (error) {
//       console.error('Error updating column:', error)
//     }
//   }
//
//   const handleColumnRemove = async (e: any) => {
//     const { column } = e.detail
//     try {
//       await deleteColumn(column.id)
//       fetchColumns()
//     } catch (error) {
//       console.error('Error removing column:', error)
//     }
//   }
//
//   const handleColumnReorder = async (e: any) => {
//     const { column, index } = e.detail
//     try {
//       await reorderColumn(column.id, index)
//       fetchColumns()
//     } catch (error) {
//       console.error('Error reordering column:', error)
//     }
//   }
//
//   return (
//     <Kanban
//       id="projectKanban"
//       columns={columns}
//       editable={true}
//       taskActions={true}
//       taskComments={true}
//       taskDue={true}
//       taskProgress={true}
//       userList={true}
//       taskTags={true}
//       taskPriority={true}
//       addNewButton={true}
//       allowColumnEdit={true}
//       addNewColumn={true}
//       allowColumnRemove={true}
//       columnSummary={true}
//       collapsible={true}
//       columnActions={true}
//       columnFooter={true}
//       columnColorEntireSurface={true}
//       allowColumnReorder={true}
//       addNewButtonDisplayMode={'bottom'}
//       applyColumnColorToTasks={true}
//       autoSaveState={true}
//       taskActionsPosition={'right'}
//       taskContentTemplate={'content'}
//       taskHeaderTemplate={'header'}
//       taskFooterTemplate={'footer'}
//       taskTemplate={'task'}
//       taskRemove={true}
//       taskSummary={true}
//       taskSummaryTemplate={'summary'}
//       taskSummaryPosition={'bottom'}
//       priorityList={true}
//       onColumnAdd={handleColumnAdd}
//       onColumnRemove={handleColumnRemove}
//       onColumnUpdate={handleColumnUpdate}
//       onColumnReorder={handleColumnReorder}
//     />
//   )
// }
//


'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Kanban from "smart-webcomponents-react/kanban";
import 'smart-webcomponents-react/source/styles/smart.default.css'
import {ChevronLeftIcon} from "@heroicons/react/16/solid";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getBoard, getBoardColumns} from "@/actions/kanban/list";
import {useToast} from "@/hooks/use-toast";
import {addColumn, deleteColumn, getColumns, reorderColumn, updateColumn} from "@/actions/kanban/column-actions";
import {Loader2} from "lucide-react";
import Loading from "@/app/loading";

const AutoBoardDetail = ({ boardId }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [users, setUsers] = useState([
        // ... (user data remains unchanged)
    ]);
    const [board, setBoard] = useState(null);
    const [columns, setColumns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchColumns = async () => {
        try {
            const response = await getColumns(boardId);
            setColumns(response.data);
            console.log("board columns", response);
            console.log("board columns data", response.data);
        } catch (error) {
            console.error('Error fetching columns:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await fetchColumns();
                const boardDetail = await getBoard(boardId);
                setBoard(boardDetail?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast({
                    title: "Error",
                    description: "Failed to fetch board data",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [boardId]);

    if (isLoading) return <Loading />;
    if (!board) return null;

    const { title, color } = board;

    const handleColumnAdd = async (e) => {
        const { newColumn } = e.detail;
        try {
            await addColumn(boardId, newColumn.label, newColumn.dataField, columns.length);
            await fetchColumns();
        } catch (error) {
            console.error('Error adding column:', error);
        }
    }

    const handleColumnUpdate = async (e) => {
        const { column } = e.detail;
        try {
            await updateColumn(column.id, column.label, column.dataField, column.order);
            await fetchColumns();
            toast({
                title: "Success",
                description: "Column updated successfully",
            });
        } catch (error) {
            console.error('Error updating column:', error);
            toast({
                title: "Error",
                description: "Failed to update column",
                variant: "destructive",
            });
        }
    }

    const handleColumnRemove = async (e) => {
        const { column } = e.detail;
        try {
            await deleteColumn(column.id);
            await fetchColumns();
            toast({
                title: "Success",
                description: "Column removed successfully",
            });
        } catch (error) {
            console.error('Error removing column:', error);
            toast({
                title: "Error",
                description: "Failed to remove column",
                variant: "destructive",
            });
        }
    }

    const handleColumnReorder = async (e) => {
        const { column, index } = e.detail;
        try {
            await reorderColumn(column.id, index);
            await fetchColumns();
            toast({
                title: "Success",
                description: "Column reordered successfully",
            });
        } catch (error) {
            console.error('Error reordering column:', error);
            toast({
                title: "Error",
                description: "Failed to reorder column",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="relative w-full h-screen" style={{backgroundColor: color, opacity: 0.8}}>
            <Button asChild className={'absolute top-4 left-4 flex gap-2 items-center text-sm '} >
                <Link href={'/auto-board'}> <ChevronLeftIcon className="h-4 w-4"/> Back</Link>
            </Button>

            <div className={'w-[80%] mx-auto'}>
                <h1 className={'text-xl font-bold text-center py-12'}>{title}</h1>
                <Kanban
                    license="8414516F-15A2-4D84-A7AF-A9A72400DB02"
                    id="projectKanban"
                    columns={columns}
                    editable={true}
                    taskActions={true}
                    taskComments={true}
                    taskDue={true}
                    taskProgress={true}
                    userList={true}
                    users={users}
                    currentUser={users[0]?.id}
                    taskTags={true}
                    taskPriority={true}
                    addNewButton={true}
                    allowColumnEdit={true}
                    addNewColumn={true}
                    allowColumnRemove={true}
                    columnSummary={true}
                    collapsible={true}
                    columnActions={true}
                    columnFooter={true}
                    columnColorEntireSurface={true}
                    onSortPrepare={true}
                    allowColumnReorder={true}
                    addNewButtonDisplayMode={'bottom'}
                    applyColumnColorToTasks={true}
                    autoSaveState={true}
                    taskActionsPosition={'right'}
                    taskContentTemplate={'content'}
                    taskHeaderTemplate={'header'}
                    taskFooterTemplate={'footer'}
                    taskTemplate={'task'}
                    taskRemove={true}
                    taskSummary={true}
                    taskSummaryTemplate={'summary'}
                    taskSummaryPosition={'bottom'}
                    priorityList={true}
                    onColumnAdd={handleColumnAdd}
                    onColumnRemove={handleColumnRemove}
                    onColumnUpdate={handleColumnUpdate}
                    onColumnReorder={handleColumnReorder}
                />
            </div>
        </div>
    );
};

export default AutoBoardDetail;
