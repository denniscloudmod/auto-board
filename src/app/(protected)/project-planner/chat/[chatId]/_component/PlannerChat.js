'use client';

import React, {useEffect, useState} from 'react';
import { invokeBedrockAgent } from '@/actions/invoke-agent';
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {Loader2, SendIcon, AlertTriangle, SaveAllIcon} from "lucide-react";
import { generateSessionId } from "@/utils/helpers";
import {getProjectPlan} from "@/actions/project-plan/detail";
import {MDXRemote} from "next-mdx-remote/rsc";
import MdxChatText from "@/app/(protected)/project-planner/chat/[chatId]/_component/MDXChatText";

const PlannerChat = ({chatId}) => {


    // const [planText, setPlanText] = useState(null)



    // if (!planText){
    //     return <div className={'flex items-center justify-center'}><Loader2 className={'animate-spin w-5 h-5'}/></div>
    // }

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPlan = async () => {
            const { data } = await getProjectPlan(chatId);
            const { content } = data;
            setMessages([{ text: content, sender: 'ai' }])
        }
        fetchPlan();
    }, [chatId]);

    const handleSendMessage = async () => {
        if (input.trim()) {
            setLoading(true);
            setError(null);

            const userMessage = { text: input, sender: 'user' };

            if (editIndex !== null) {
                const updatedMessages = [...messages];
                updatedMessages[editIndex].text = input;
                setMessages(updatedMessages);
                setEditIndex(null);
            } else {
                setMessages((prevMessages) => [...prevMessages, userMessage]);
            }

            try {
                const response = await invokeBedrockAgent(input, generateSessionId());
                const aiMessage = { text: response.completion, sender: 'ai' };
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
            } catch (error) {
                console.error('Error invoking Bedrock agent:', error);
                setError('An error occurred while sending the message. Please try again.');
            } finally {
                setLoading(false);
                setInput('');
            }
        }
    };

    const handleEditMessage = (index) => {
        setInput(messages[index].text);
        setEditIndex(index);
    };

    const [isSavingAll, setIsSavingAll] = useState(false)

    const handleSaveAll = () => {
        setIsSavingAll(true)
        try {

        } catch (error){

        } finally {
            setIsSavingAll(false)
        }
    }

    return (
        <div className={'flex flex-col p-6 min-h-screen w-full max-w-3xl mx-auto space-y-4'}>
            <div className="flex items-center justify-center ">
            {/*<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">*/}
            {/*    <div className="flex flex-col w-full max-w-3xl h-[80%] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">*/}
            <div className="flex flex-col w-full h-[85vh] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {/*<div className="flex flex-col w-full max-w-3xl h-[85vh] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">*/}

                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
                    {messages?.map((message, index) => (
                        <div key={index} className={`relative flex items-center p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-2xl transition-all duration-200 ${
                        // <div key={index} className={`relative flex items-center p-3 rounded-lg max-w-xs md:max-w-md transition-all duration-200 ${
                            message.sender === 'user'
                                ? 'bg-black text-white dark:bg-gray-600 self-end'
                                : 'bg-gray-100 text-gray-900 self-start'
                        }`}
                        >
                            {message.text}
                            {/*<MdxChatText source={message.text}/>*/}
                            {message.sender === 'user' && (
                                <div
                                    className="ml-2 text-sm cursor-pointer absolute top-1 right-1"
                                    onClick={() => handleEditMessage(index)}
                                >
                                    <PencilSquareIcon className="h-5 w-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-center mt-4">
                            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                        </div>
                    )}
                </div>
                {/* Error Message */}
                {error && (
                    <div className="flex items-center space-x-2 p-2 bg-red-100 border-t border-red-400 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                )}
                <div className="p-4 bg-gray-50 border-t border-gray-300">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={loading}
                        />
                        <Button
                            className="flex items-center justify-center p-3 bg-black dark:text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                            onClick={handleSendMessage}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                editIndex !== null ? 'Update' : <SendIcon className="h-5 w-5 text-white"/>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
            <Button onClick={handleSaveAll} className={'bg-black text-white dark:bg-orange-500 w-full md:max-w-[30%] self-end'}>
                <span>Complete and Save</span> { isSavingAll ? <Loader2 className={'ml-2 animate-spin w-4 h-4'}/> : <SaveAllIcon className={'ml-2 w-5 h-5'}/>}
            </Button>
        </div>
    );
};

export default PlannerChat;
