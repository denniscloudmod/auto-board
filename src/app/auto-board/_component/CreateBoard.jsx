"use client";
import React, {useEffect, useState} from 'react';
import {Check, ChevronLeft, Loader2Icon, X} from 'lucide-react';
import {EllipsisHorizontalIcon} from "@heroicons/react/16/solid";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {createBoard} from "@/actions/kanban/create";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {gradients, solidColors} from "@/utils/constants";



export default function CreateBoard({ isOpen, onClose }) {

    const router = useRouter();
    const { toast } = useToast()


    const [title, setTitle] = useState('');
    const [selectedBackground, setSelectedBackground] = useState( { id: 'g9', class: 'bg-gradient-to-r from-orange-500 to-red-500' });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [boards, setBoards] = useState([]);
    const [previewColors, setPreviewColors] = useState([...gradients, ...solidColors])

    const updatePreviewColors = (color) => {
        const uniqueColors = new Set([color, ...gradients, ...solidColors]);
        const previewColors = Array.from(uniqueColors);
        setPreviewColors(previewColors);
    };



    // const handleSubmit = () => {
    //     console.log("Title", title);
    //     console.log("Selected Background", selectedBackground.class);
    //     // onClose();
    // };

    const handleCreateBoard = async () => {
        setIsLoading(true);
        try {
            const newBoard = await createBoard(title, selectedBackground.class, 'e16575cd-e9d3-47d5-b3ba-d3ef612f5683');
            if (newBoard.status === 201) {
                setBoards([...boards, newBoard.data]);
                toast({
                    title: "Created",
                    description: "Board created successfully",
                    variant: "default"
                });
                console.log("newBoard.data.id", newBoard.data.id)
                router.push(`/auto-board/${newBoard.data.id}`);
            } else {
                toast({
                    title: "Error",
                    description: "Something went wrong, try again later",
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.error('Error creating or updating board:', error);
            toast({
                title: "Error",
                description: "Something went wrong, try again later",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }

        onClose();
    };


    if (!isOpen) return null;

    const ColorPicker = () => (
        <div className="absolute inset-0 -top-72 z-10 w-[70%]">
            <div className={'rounded-md shadow-md bg-gray-50 '}>
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <button
                        onClick={() => setShowColorPicker(false)}
                        className="text-gray-700 hover:text-gray-900 mr-2"
                    >
                        <ChevronLeft size={20}/>
                    </button>
                    <h3 className="text-lg font-medium text-gray-900">Colors</h3>
                    <button
                        onClick={() => setShowColorPicker(false)}
                        className="text-gray-700 hover:text-gray-900 mr-2"
                    >
                        <CloseIcon size={20}/>
                    </button>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-3 gap-3">
                        {gradients.map((gradient) => (
                            <button
                                key={gradient.id}
                                className={`relative w-full h-12 rounded-lg ${gradient.class} transition-transform hover:scale-105`}
                                onClick={() => {
                                    setSelectedBackground(gradient);
                                    setShowColorPicker(false);
                                    updatePreviewColors(gradient);
                                }}
                            >
                                {selectedBackground.id === gradient.id && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Check className="text-white" size={24}/>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    <hr className={'my-6'}/>
                    <div className="grid grid-cols-3 gap-3">
                        {solidColors.map((color) => (
                            <button
                                key={color.id}
                                className={`relative w-full h-12 rounded-lg ${color.class} transition-transform hover:scale-105`}
                                onClick={() => {
                                    setSelectedBackground(color);
                                    setShowColorPicker(false);
                                    updatePreviewColors(color);
                                }}
                            >
                                {selectedBackground.id === color.id && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Check className="text-white" size={24}/>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 flex items-center justify-end z-40">
            <div className="relative rounded-md shadow-md bg-gray-50 w-96">
                {showColorPicker ? (
                    <ColorPicker/>
                ) : (
                    <>
                        <div className="flex justify-between items-center p-4 border-b border-gray-300">
                            <h2 className="text-lg text-gray-900 font-medium">Create board</h2>
                            <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
                                <X size={20}/>
                            </button>
                        </div>

                        <div className="p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Background</h3>
                            <div className="grid grid-cols-6 gap-2 mb-4">
                                {previewColors.slice(0,5).map((color) => (
                                    <button
                                        key={color.id}
                                        disabled={selectedBackground.id === color.id}
                                        className={`relative w-10 h-8 rounded-md disabled:cursor-not-allowed ${color.class} ${selectedBackground.id === color.id && 'border border-black shadow-md'}`}
                                        onClick={() => setSelectedBackground(color)}
                                    >
                                        {selectedBackground.id === color.id && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Check className="text-white" size={16}/>
                                            </div>
                                        )}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setShowColorPicker(true)}
                                    className="w-10 h-8 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-black flex items-center justify-center text-gray-600"
                                >
                                    <EllipsisHorizontalIcon className="h-5 w-5"/>
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-gray-900 font-medium mb-2">
                                    Board title<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                    placeholder="Enter board title"
                                />
                                {!title && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        👋 Board title is required
                                    </p>
                                )}
                            </div>

                            <Button
                                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:text-gray-200 mb-2"
                                disabled={!title || !selectedBackground || isLoading}
                                onClick={handleCreateBoard}
                            >
                                {isLoading && <Loader2Icon className={"mr-2 h-4 w-4 animate-spin"}/>}  {'Create'}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}