"use client"

import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import * as React from "react";
import Link from "next/link"

export const projectColumns = [
    {
        header: "Project Name",
        accessorKey: "projectName",
    },
    {
        header: "Owner",
        accessorKey: "owner",
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("createdAt")}</div>,
    },
    {
        header: "Last Updated",
        accessorKey: "lastUpdated",
    },
    {
        header: "Actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]


export const generateKanbanBoard = (id) => {
    const questionnaire = JSON.parse(localStorage.getItem('plannerQuestionnaires'));
    const project = questionnaire.find(project => project.id === id);
    return project.data.map(item => `${item.question} \n ${item.answer}`);

}


export const projectPlannerColumns = [
    {
        header: "Project Name",
        accessorKey: "title",
    },
    // {
    //     header: "Owner",
    //     accessorKey: "owner",
    // },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("createdAt")}</div>,
    },
    {
        header: "Last Updated",
        accessorKey: "updatedAt",
    },
    {
        header: "Actions",
        cell : ({row}) => {
            return (
                <div className="flex gap-2">
                    <Button
                        className={'bg-black text-white'}>
                        <Link href={`#`}>Create Kanban</Link>
                        {/*<Link href={`/project-planner/${row.original.id}`}>Create Kanban</Link>*/}
                    </Button>
                    <Button asChild variant={'outline'}>
                        <Link href={`/project-planner/docs/${row.original.id}`}>Docs</Link>
                    </Button>
                </div>
            )
        }
    },
    {
        header: " ",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/*<DropdownMenuItem>*/}
                        {/*    <Link href={`/project-planner/editor/${row.original.id}`}>Edit</Link>*/}
                        {/*</DropdownMenuItem>*/}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button className={'bg-red-500 text-white'}>
                                Delete
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]


export const projectEditorColumns = [
    {
        header: "Project Name",
        accessorKey: "projectName",
    },
    {
        header: "Owner",
        accessorKey: "owner",
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("createdAt")}</div>,
    },
    {
        header: "Last Updated",
        accessorKey: "lastUpdated",
    },
    {
        header: "Actions",
        cell : ({row}) => {
            return (
                <div className="flex gap-2">
                    <Button
                        className={'bg-black'}>
                        <Link href={`/project-planner/${row.original.id}`}>Kanban</Link>
                    </Button>
                    <Button asChild variant={'outline'}>
                        <Link href={`/project-planner/editor/${row.original.id}`}>Editor</Link>
                    </Button>
                </div>
            )
        }
    },
    {
        header: " ",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link href={`/project-planner/editor/${row.original.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]