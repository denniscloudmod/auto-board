'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Kanban from "smart-webcomponents-react/kanban";
import 'smart-webcomponents-react/source/styles/smart.default.css'
import {ChevronLeftIcon} from "@heroicons/react/16/solid";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useToast} from "@/hooks/use-toast";
import {kanbanMessages} from "@/utils/constants";


const TestPage = ({ boardId }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [users, setUsers] = useState([
        // ... (user data remains unchanged)
    ]);

    const columns = [
        { addNewButton: true, collapsible: true,
            dataField: 'dataField9053', label: 'Todo'},
        { addNewButton: true, collapsible: true,
            dataField: 'dataFieldbc39', label: 'In Progress'},
        { addNewButton: true, collapsible: true,
            dataField: 'dataField8008', label: 'Blocked'},
        { addNewButton: true, collapsible: true,
            dataField: 'dataField9ed9', label: 'Pending'},
        { addNewButton: true, collapsible: true,
            dataField: 'dataFieldaaef', label: 'Done'}
    ]


    const dataSource = [
        {
            id: "task-001",
            text: "Implement user authentication",
            status: "dataField9053",
            // status: "todo",
            priority: "high",
            progress: 0,
            startDate: new Date("2024-03-20T09:00:00Z"),
            dueDate: new Date("2024-04-03T17:00:00Z"),
            userId: "user-201",
            tags: "backend,security",
            color: "#FF5722",
            swimlane: "Backend",
            checklist: [
                { completed: false, text: "Research authentication methods" },
                { completed: false, text: "Implement JWT" },
                { completed: false, text: "Test with frontend" }
            ]
        },
        {
            id: "task-002",
            text: "Design landing page",
            status: "dataFieldbc39",
            priority: "medium",
            progress: 60,
            startDate: new Date("2024-03-18T10:00:00Z"),
            dueDate: new Date("2024-03-25T17:00:00Z"),
            userId: "user-102",
            tags: "frontend,design",
            color: "#2196F3",
            swimlane: "Design",
            comments: [
                { text: "Let's use a minimalist approach", time: new Date("2024-03-19T11:30:00Z"), userId: "user-102" }
            ]
        },
        {
            id: "task-003",
            text: "Optimize database queries",
            status: "dataField8008",
            priority: "high",
            progress: 90,
            startDate: new Date("2024-03-15T08:00:00Z"),
            dueDate: new Date("2024-03-22T17:00:00Z"),
            userId: "user-203",
            tags: "backend,performance",
            color: "#9C27B0",
            swimlane: "Backend"
        },
        {
            id: "task-004",
            text: "Implement responsive design",
            status: "dataField9ed9",
            priority: "medium",
            progress: 100,
            startDate: new Date("2024-03-10T09:00:00Z"),
            dueDate: new Date("2024-03-17T17:00:00Z"),
            userId: "user-104",
            tags: "frontend,css",
            color: "#4CAF50",
            swimlane: "Frontend"
        },
        {
            id: "task-005",
            text: "Set up CI/CD pipeline",
            status: "dataFieldbc39",
            priority: "high",
            progress: 40,
            startDate: new Date("2024-03-22T08:00:00Z"),
            dueDate: new Date("2024-04-05T17:00:00Z"),
            userId: "user-205",
            tags: "devops,automation",
            color: "#FFC107",
            swimlane: "DevOps"
        },
        {
            id: "task-006",
            text: "Create user onboarding flow",
            status: "dataField9053",
            // status: "todo",
            priority: "low",
            progress: 0,
            startDate: new Date("2024-04-01T09:00:00Z"),
            dueDate: new Date("2024-04-15T17:00:00Z"),
            userId: "user-106",
            tags: "ux,frontend",
            color: "#00BCD4",
            swimlane: "UX"
        },
        {
            id: "task-007",
            text: "Implement payment gateway",
            status: "dataFieldaaef",
            priority: "high",
            progress: 20,
            startDate: new Date("2024-03-25T08:00:00Z"),
            dueDate: new Date("2024-04-08T17:00:00Z"),
            userId: "user-207",
            tags: "backend,integration",
            color: "#F44336",
            swimlane: "Backend",
            comments: [
                { text: "Waiting for API credentials from the payment provider", time: new Date("2024-03-26T14:20:00Z"), userId: "user-207" }
            ]
        },
        {
            id: "task-008",
            text: "Write unit tests for core modules",
            status: "dataFieldbc39",
            priority: "medium",
            progress: 30,
            startDate: new Date("2024-03-28T09:00:00Z"),
            dueDate: new Date("2024-04-11T17:00:00Z"),
            userId: "user-208",
            tags: "testing,quality",
            color: "#795548",
            swimlane: "QA"
        },
        {
            id: "task-009",
            text: "Refactor legacy code",
            status: "dataField8008",
            priority: "low",
            progress: 80,
            startDate: new Date("2024-03-20T08:00:00Z"),
            dueDate: new Date("2024-04-03T17:00:00Z"),
            userId: "user-209",
            tags: "refactoring,maintenance",
            color: "#607D8B",
            swimlane: "Maintenance"
        },
        {
            id: "task-010",
            text: "Prepare for product demo",
            status: "dataField9053",
            // status: "todo",
            priority: "high",
            progress: 0,
            startDate: new Date("2024-04-10T09:00:00Z"),
            dueDate: new Date("2024-04-17T15:00:00Z"),
            userId: "user-210",
            tags: "presentation,marketing",
            color: "#E91E63",
            swimlane: "Marketing",
            checklist: [
                { completed: false, text: "Prepare slides" },
                { completed: false, text: "Set up demo environment" },
                { completed: false, text: "Rehearse presentation" }
            ]
        }
    ];

    return (
        <div className={`relative w-full h-screen bg-teal-500 bg-opacity-80`} >
            <Button asChild className={'absolute top-4 left-4 flex gap-2 items-center text-sm '} >
                <Link href={'/auto-board'}> <ChevronLeftIcon className="h-4 w-4"/> Back</Link>
            </Button>

            <div className={'w-[80%] mx-auto'}>
            {/*<div className={'w-[90%] mx-auto'}>*/}
                <h1 className={'text-xl font-bold text-center py-12'}>Test Page</h1>
                <Kanban
                    id="projectKanban"
                    messages={kanbanMessages}
                    dataSource={dataSource}
                    columns={columns}
                    editable={true}
                    taskActions={true}
                    taskComments={true}
                    taskDue={true}
                    taskProgress={true}
                    userList={true}
                    users={users}
                    columnColors={true}
                    // color={'#261C15'}
                    theme={'blue'}
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
                />
            </div>
        </div>
    );
};

export default TestPage;