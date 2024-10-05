'use client';

import React, { useState } from 'react';
import { invokeBedrockAgent } from '@/actions/invoke-agent';
import {Button} from "@/components/ui/button";
import {PencilSquareIcon} from "@heroicons/react/16/solid";
import {Loader2} from "lucide-react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateSessionId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const handleSendMessage = async () => {
        if (input.trim()) {
            setLoading(true);
            if (editIndex !== null) {
                const updatedMessages = [...messages];
                updatedMessages[editIndex].text = input;
                setMessages(updatedMessages);
                setEditIndex(null);
            } else {
                const userMessage = { text: input, sender: 'user' };
                setMessages([...messages, userMessage]);

                try {
                    const response = await invokeBedrockAgent(input, generateSessionId());
                    const aiMessage = { text: response.completion, sender: 'ai' };
                    setMessages(prevMessages => [...prevMessages, aiMessage]);
                } catch (error) {
                    console.error('Error invoking Bedrock agent:', error);
                }
            }
            setInput('');
            setLoading(false);
        }
    };

    const handleEditMessage = (index) => {
        setInput(messages[index].text);
        setEditIndex(index);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col w-full md:w-1/3 h-96 bg-white rounded-md shadow-lg">
                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div key={index} className={`relative mb-2 p-2 rounded-md ${message.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                            {message.text}
                            {message.sender === 'user' && (
                                <div
                                    className="ml-2 text-sm text-white cursor-pointer absolute top-0 right-0 px-2 py-1"
                                    onClick={() => handleEditMessage(index)}
                                >
                                    <PencilSquareIcon className="h-6 w-6 mr-2" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-white border-t border-gray-300">
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type your text..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={loading}
                    />
                    <Button
                        className="mt-2 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500"
                        onClick={handleSendMessage}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className={'mr-2 h-4 w-4 animate-spin'} /> : (editIndex !== null ? 'Update' : 'Send')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Chat;