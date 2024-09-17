'use client';

import React, { useState, useEffect } from 'react';
import Kanban from "smart-webcomponents-react/kanban";
import 'smart-webcomponents-react/source/styles/smart.default.css'
import {ChevronLeftIcon} from "@heroicons/react/16/solid";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {toast} from "@/hooks/use-toast";

const PlannerKanbanBoard = ({ boardId }) => {
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


    // useEffect(() => {
    //     const storedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    //     const currentBoard = storedBoards.find((b) => b.id === parseInt(boardId, 10));
    //     setBoard(currentBoard);
    // }, [boardId]);

    useEffect(() => {
        const data = localStorage.getItem('plannerQuestionnaires');

        if (data) {
            const parsedData = JSON.parse(data);
            const projectData = parsedData.find(project => project.id === boardId);

            if (!projectData) {
                toast({
                    title: "Error",
                    description: "Project not found.",
                    variant: "destructive",
                });
                return;
            }
            // const htmlContent = projectData.data.map(item =>
            //     `<p style="margin-bottom: 1rem"><strong>${item.question}</strong> <br> ${item.answer}</p>`
            // ).join('');

            setBoard(projectData);


        }
    }, [boardId]);


    if (!board) return <div>Loading...</div>;

    
    const { projectName, kanbanBoard } = board || {};

    // console.log("----------------------")
    // console.log("board columns 1", kanbanBoard.columns)
    // console.log("----------------------")
    // console.log("board dataSource 1", kanbanBoard.dataSource)
    // console.log("----------------------")
    // console.log("board color 1", kanbanBoard.color)
    // console.log("----------------------")
    // console.log("board title 1", kanbanBoard.title)
    // console.log("----------------------")


    return (
        <div className="relative w-full h-screen" style={{backgroundColor: kanbanBoard.color, opacity: 0.8}}>

            <Button asChild className={'absolute top-4 left-4 flex gap-2 items-center text-sm '} >
                 <Link href={'/project-planner'}> <ChevronLeftIcon className="h-4 w-4"/> Back</Link>
            </Button>


            <div className={'w-[80%] mx-auto'}>
                <h1 className={'text-xl font-bold text-center py-12'}>{projectName}</h1>
                <Kanban
                    license={process.env.NEXT_PUBLIC_SMART_LICENSE_KEY}
                    id="projectKanban"
                    dataSource={kanbanBoard.dataSource}
                    columns={kanbanBoard.columns}
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

export default PlannerKanbanBoard;