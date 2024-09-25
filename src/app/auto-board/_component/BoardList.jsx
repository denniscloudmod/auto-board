import React, { useState } from 'react';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { EyeIcon, PencilSquareIcon, TrashIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const BoardList = ({ boards, onEditBoard, onDeleteBoard }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [boardToDelete, setBoardToDelete] = useState(null);

    const handleDeleteClick = (board) => {
        setBoardToDelete(board);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (boardToDelete) {
            onDeleteBoard(boardToDelete.id);
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <>
            {boards.map((board) => (
                <div
                    key={board.id}
                    className="relative h-[7rem] p-6 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105 flex items-center justify-center"
                    style={{ backgroundColor: board.color }}
                >
                    <h3 className="absolute top-2 left-2 text-lg font-normal">{board.title}</h3>
                    <Popover className="absolute top-2 right-2 z-10">
                        <Popover.Button className="p-1 rounded-full bg-gray-200/20 text-gray-50 hover:bg-gray-400">
                            <EllipsisVerticalIcon className="h-5 w-5" />
                        </Popover.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Popover.Panel className="absolute z-10 right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
                                <div className="py-1">
                                    <button
                                        onClick={() => onEditBoard(board)}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <PencilSquareIcon className="h-4 w-4 inline-block mr-2" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(board)}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        <TrashIcon className="h-4 w-4 inline-block mr-2" />
                                        Delete
                                    </button>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                    <Link href={`/auto-board/${board.id}`}>
                        <EyeIcon className="h-10 w-10 opacity-50" />
                    </Link>
                </div>
            ))}

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this board?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the board and all its contents.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default BoardList;