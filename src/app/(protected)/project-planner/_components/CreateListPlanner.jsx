'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {ChevronLeftIcon, EyeIcon, PencilSquareIcon, PlusIcon} from "@heroicons/react/16/solid";
import {Button} from "@/components/ui/button";
import WorkSpaceBackButton from "@/components/WorkSpaceBackButton";

const CreateListPlanner = ({children}) => {
    const [boards, setBoards] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#3490dc');

    const openModal = (board = null) => {
        if (board) {
            setIsEdit(true);
            setSelectedBoard(board);
            setTitle(board.title);
            setColor(board.color);
        } else {
            setIsEdit(false);
            setSelectedBoard(null);
            setTitle('');
            setColor('#3490dc');
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTitle('');
        setColor('#3490dc');
        setIsEdit(false);
        setSelectedBoard(null);
    };

    const handleCreateOrUpdateBoard = () => {
        if (isEdit) {
            const updatedBoards = boards.map((board) =>
                board.id === selectedBoard.id
                    ? { ...board, title, color }
                    : board
            );
            setBoards(updatedBoards);
            localStorage.setItem('boards', JSON.stringify(updatedBoards));
        } else {
            const newBoard = {
                id: Date.now(),
                title,
                color,
                columns: [
                    // { id: 'todo', title: 'Todo', tasks: [] },
                    // { id: 'inProgress', title: 'In Progress', tasks: [] },
                    // { id: 'testing', title: 'Testing', tasks: [] },
                    // { id: 'done', title: 'Done', tasks: [] },
                    { label: 'To Do', dataField: 'toDo' },
                    { label: 'In Progress', dataField: 'inProgress' },
                    { label: 'Testing', dataField: 'testing' },
                    { label: 'Done', dataField: 'done' },
                ],
            };
            const updatedBoards = [...boards, newBoard];
            setBoards(updatedBoards);
            localStorage.setItem('boards', JSON.stringify(updatedBoards));
            // router.push(`/board/${newBoard.id}`);
        }
        closeModal();
    };

    const handleEditBoard = (board) => {
        openModal(board);
    };

    useEffect(
        () => {
            const storedBoards = JSON.parse(localStorage.getItem('boards')) || [];
            setBoards(storedBoards);
        }, []
    )


    return (
        <div className="py-12 px-2">
            {/*<WorkSpaceBackButton/>*/}
            <div className={' w-full mx-auto  mb-12 flex items-center justify-between '}>
                <h1 className="text-2xl font-bold text-center">Project Planner</h1>
                <Button className={'text-white'} asChild>
                     <Link href={'/project-planner/questionnaire'}>
                         <PlusIcon className="h-3 w-3 mr-1"/> Create new
                </Link>
                </Button>
            </div>
            <div className={' w-[80%] mx-auto  mb-12 flex items-center justify-between '}>
                {children}
            </div>
        </div>
    );
};

export default CreateListPlanner;
