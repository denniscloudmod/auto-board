

// 'use client';
//
// import React, { useState, useRef, useEffect } from 'react';
// import { invokeBedrockAgent } from '@/actions/invoke-agent';
// import { Button } from "@/components/ui/button";
// import { PencilIcon, SendIcon, UserIcon } from "lucide-react";
// import { Loader2 } from "lucide-react";
// import { generateSessionId } from "@/utils/helpers";
//
// const Chat = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');
//     const [editIndex, setEditIndex] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const messagesEndRef = useRef(null);
//
//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };
//
//     useEffect(scrollToBottom, [messages]);
//
//     const handleSendMessage = async () => {
//         if (input.trim()) {
//             setLoading(true);
//             if (editIndex !== null) {
//                 const updatedMessages = [...messages];
//                 updatedMessages[editIndex].text = input;
//                 setMessages(updatedMessages);
//                 setEditIndex(null);
//             } else {
//                 const userMessage = { text: input, sender: 'user' };
//                 setMessages([...messages, userMessage]);
//
//                 try {
//                     const response = await invokeBedrockAgent(input, generateSessionId());
//                     const aiMessage = { text: response.completion, sender: 'ai' };
//                     setMessages(prevMessages => [...prevMessages, aiMessage]);
//                 } catch (error) {
//                     console.error('Error invoking Bedrock agent:', error);
//                     const errorMessage = { text: "Sorry, I encountered an error. Please try again.", sender: 'ai' };
//                     setMessages(prevMessages => [...prevMessages, errorMessage]);
//                 }
//             }
//             setInput('');
//             setLoading(false);
//         }
//     };
//
//     const handleEditMessage = (index) => {
//         setInput(messages[index].text);
//         setEditIndex(index);
//     };
//
//     return (
//         <div className="flex flex-col h-screen bg-gray-50">
//             <div className="flex-1 overflow-y-auto px-4 py-8">
//                 <div className="max-w-3xl mx-auto space-y-6">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                             <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
//                                 <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-500 ml-2' : 'bg-green-500 mr-2'}`}>
//                                     {message.sender === 'user' ? <UserIcon className="h-5 w-5 text-white" /> : <SendIcon className="h-5 w-5 text-white" />}
//                                 </div>
//                                 <div className={`relative p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-white border border-gray-200'}`}>
//                                     <p className="text-sm">{message.text}</p>
//                                     {message.sender === 'user' && (
//                                         <button
//                                             className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600"
//                                             onClick={() => handleEditMessage(index)}
//                                         >
//                                             <PencilIcon className="h-4 w-4" />
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                 </div>
//             </div>
//             <div className="border-t bg-white p-4">
//                 <div className="max-w-3xl mx-auto">
//                     <div className="flex items-center space-x-2">
//                         <input
//                             type="text"
//                             className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Type your message..."
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
//                             disabled={loading}
//                         />
//                         <Button
//                             className={`p-2 ${loading || !input.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md`}
//                             onClick={handleSendMessage}
//                             disabled={loading || !input.trim()}
//                         >
//                             {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendIcon className="h-5 w-5" />}
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Chat;


// 'use client';
//
// import React, { useState } from 'react';
// import { invokeBedrockAgent } from '@/actions/invoke-agent';
// import { Button } from "@/components/ui/button";
// import { PencilSquareIcon } from "@heroicons/react/24/solid";
// import {Loader2, SendIcon} from "lucide-react";
// import { generateSessionId } from "@/utils/helpers";
//
// const Chat = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');
//     const [editIndex, setEditIndex] = useState(null);
//     const [loading, setLoading] = useState(false);
//
//     const handleSendMessage = async () => {
//         if (input.trim()) {
//             setLoading(true);
//             if (editIndex !== null) {
//                 const updatedMessages = [...messages];
//                 updatedMessages[editIndex].text = input;
//                 setMessages(updatedMessages);
//                 setEditIndex(null);
//             } else {
//                 const userMessage = { text: input, sender: 'user' };
//                 setMessages([...messages, userMessage]);
//
//                 try {
//                     const response = await invokeBedrockAgent(input, generateSessionId());
//                     const aiMessage = { text: response.completion, sender: 'ai' };
//                     setMessages(prevMessages => [...prevMessages, aiMessage]);
//                 } catch (error) {
//                     console.error('Error invoking Bedrock agent:', error);
//                 }
//             }
//             setInput('');
//             setLoading(false);
//         }
//     };
//
//     const handleEditMessage = (index) => {
//         setInput(messages[index].text);
//         setEditIndex(index);
//     };
//
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//             <div className="flex flex-col w-full max-w-2xl h-[70vh] bg-white rounded-lg shadow-lg overflow-hidden">
//                 {/* Chat Messages */}
//                 <div className="flex-1 p-4 overflow-y-auto space-y-4">
//                     {messages.map((message, index) => (
//                         <div
//                             key={index}
//                             className={`relative flex items-center p-4 rounded-lg max-w-xs md:max-w-md ${
//                                 message.sender === 'user'
//                                     ? 'bg-blue-500 text-white self-end'
//                                     : 'bg-gray-200 text-gray-900 self-start'
//                             }`}
//                         >
//                             {message.text}
//                             {message.sender === 'user' && (
//                                 <div
//                                     className="ml-2 text-sm cursor-pointer absolute top-1 right-1"
//                                     onClick={() => handleEditMessage(index)}
//                                 >
//                                     <PencilSquareIcon className="h-5 w-5 text-white" />
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 {/* Input and Send Button */}
//                 <div className="p-4 border-t border-gray-300 bg-gray-50">
//                     <div className="flex items-center space-x-2">
//                         <input
//                             type="text"
//                             className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Type your message..."
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//                             disabled={loading}
//                         />
//                         <Button
//                             className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                             onClick={handleSendMessage}
//                             disabled={loading}
//                         >
//                             {loading ? (
//                                 <Loader2 className="h-5 w-5 animate-spin" />
//                             ) : (
//                                 editIndex !== null ? 'Update' : <SendIcon/>
//                                 // editIndex !== null ? 'Update' : 'Send'
//                             )}
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Chat;


'use client';

import React, { useState } from 'react';
import { invokeBedrockAgent } from '@/actions/invoke-agent';
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Loader2, SendIcon, AlertTriangle } from "lucide-react";
import { generateSessionId } from "@/utils/helpers";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
        <div className="flex items-center justify-center min-h-screen p-6">
        {/*<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">*/}
        {/*    <div className="flex flex-col w-full max-w-3xl h-[80%] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">*/}
            <div className="flex flex-col w-full max-w-3xl h-[85vh] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">

                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
                    {messages.map((message, index) => (
                        <div key={index} className={`relative flex items-center p-3 rounded-lg max-w-xs md:max-w-md transition-all duration-200 ${
                                message.sender === 'user'
                                    ? 'bg-black text-white dark:bg-gray-600 self-end'
                                    : 'bg-gray-100 text-gray-900 self-start'
                            }`}
                        >
                            {message.text}
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
    );
};

export default Chat;
