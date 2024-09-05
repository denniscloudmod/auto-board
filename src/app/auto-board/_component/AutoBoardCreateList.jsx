'use client';

import React, {useState, Fragment, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import {EyeIcon, PencilSquareIcon, PlusIcon} from "@heroicons/react/16/solid";
import {Button} from "@/components/ui/button";

const AutoBoardCreateList = () => {
    const [boards, setBoards] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#3490dc');
    const router = useRouter();

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
        <div className="container mx-auto py-12 px-2">
            <h1 className="text-2xl font-bold mb-12">Boards</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map((board) => (
                    <div
                        key={board.id}
                        className="relative h-[7rem] p-6 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105 flex items-center justify-center"
                        style={{ backgroundColor: board.color }}
                    >
                        <h3 className="absolute top-2 left-2 text-lg font-normal ">{board.title}</h3>
                        <button
                            onClick={() => handleEditBoard(board)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-gray-200/20 text-gray-50 hover:bg-gray-400"
                        >
                            <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <Link href={`/auto-board/${board.id}`}>
                            <EyeIcon className="h-10 w-10 opacity-50" />
                        </Link>
                    </div>
                ))}
                <div
                    className={' flex flex-col items-center justify-center md:h-[7rem] rounded-lg border-2 gap-4 p-4 '}>
                    <Button
                        onClick={() => openModal()}
                    >
                        <PlusIcon className="h-3 w-3 mr-2" /> Create new
                    </Button>
                </div>
            </div>

            {/* Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {isEdit ? 'Edit Board' : 'Create a New Board'}
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                                            placeholder="Enter board title here"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <input
                                            type="color"
                                            className={`mt-2 block w-full p-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 cursor-pointer disabled:pointer-events-none bg-[${color}]`}
                                            value={color}
                                            title="Choose your color"
                                            onChange={(e) => setColor(e.target.value)}
                                        />
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={handleCreateOrUpdateBoard}
                                        >
                                            {isEdit ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default AutoBoardCreateList;
