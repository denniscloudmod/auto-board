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
            toast({
                title: "Success",
                description: "Column added successfully",
            });
            await fetchColumns();
        } catch (error) {
            console.error('Error adding column:', error);
            toast({
                title: "Error",
                description: "Failed to add column",
                variant: "destructive",
            });
        }
    }

    const handleColumnUpdate = async (e) => {
        const { column } = e.detail;
        try {
            await updateColumn(column.id, column.label, column.dataField, column.order);
            toast({
                title: "Success",
                description: "Column updated successfully",
            });
            await fetchColumns();
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
            toast({
                title: "Success",
                description: "Column removed successfully",
            });
            await fetchColumns();
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
            toast({
                title: "Success",
                description: "Column reordered successfully",
            });
            await fetchColumns();
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