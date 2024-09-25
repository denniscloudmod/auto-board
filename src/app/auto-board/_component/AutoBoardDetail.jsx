'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Kanban from "smart-webcomponents-react/kanban";
import 'smart-webcomponents-react/source/styles/smart.default.css'
import {ChevronLeftIcon} from "@heroicons/react/16/solid";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getBoard} from "@/actions/kanban/list";
import {useToast} from "@/hooks/use-toast";

const AutoBoardDetail = ({ boardId }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [users, setUsers] = useState([
        {
            id: 1,
            email: 'user2@example.com',
            name: 'User 1',
            profile: {
                bio: 'Bio for User 1',
            },
            allowAdd: true,
            allowComment: true,
            allowDrag: true,
            allowEdit: true,
            allowRemove: true,
        },
        {
            id: 2,
            email: 'user2@example.com',
            name: 'User 2',
            profile: {
                bio: 'Bio for User 2',
            },
            allowAdd: true,
            allowComment: true,
            allowDrag: true,
            allowEdit: true,
            allowRemove: true,
        },
        {
            id: 3,
            email: 'user3@example.com',
            name: 'User 3',
            profile: {
                bio: 'Bio for User 3',
            },
            allowAdd: true,
            allowComment: true,
            allowDrag: true,
            allowEdit: true,
            allowRemove: true,
        },
        {
            id: 4,
            email: 'user4@example.com',
            name: 'User 4',
            profile: {
                bio: 'Bio for User 4',
            },
            allowAdd: true,
            allowComment: true,
            allowDrag: true,
            allowEdit: true,
            allowRemove: true,
        }
    ]);
    const [board, setBoard] = useState(null);



    useEffect(() => {
        const getBoardDetail = async () => {
            try {
                const boardDetail = await getBoard(boardId);
                setBoard(boardDetail?.data);
                console.log("boardDetail", boardDetail)
            } catch (error) {
                console.error('Error fetching board:', error);
                toast({
                    title: "Error",
                    description: "Failed to fetch board",
                    variant: "destructive",
                })
            }
        };

        getBoardDetail();
    }, [boardId]);


    if (!board) return <div>Loading...</div>;

    const { title, color } = board || {};

    const { columns } = board || {};


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
                    // autoColumnHeight={true}
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
                />
            </div>
        </div>
    );
};

export default AutoBoardDetail;