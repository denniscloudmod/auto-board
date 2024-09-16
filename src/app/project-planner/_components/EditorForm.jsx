'use client';

import { useEffect, useRef, useState } from "react";
import { Editor } from 'smart-webcomponents-react/editor';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import { useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { invokeBedrockAgent } from "@/actions/invoke-agent";

const EditorForm = () => {
    const editorRef = useRef(null);
    const [productsData, setProductsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const searchParams = useSearchParams();
    const toolbarItems = ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'FontName', 'FontSize', 'FontColor',
        'BackgroundColor', 'LowerCase', 'UpperCase', '|', 'Formats', 'Alignment', 'OrderedList', 'UnorderedList', 'Outdent',
        'Indent', '|', 'hyperlink', 'table', 'Image', '|', 'ClearFormat', 'Print', 'SourceCode', 'splitmode', 'FullScreen', '|', 'Undo',
        'Redo', 'subscript', 'superscript', 'delete'];

    const initEditor = () => {
        editorRef.current?.expandToolbar();
    };

    const projectId = searchParams.get('projectId');


    useEffect(() => {
        const data = localStorage.getItem('plannerQuestionnaires');
        if (data) {
            const parsedData = JSON.parse(data);
            const projectData = parsedData.find(project => project.id === projectId);

            if (!projectData) {
                toast({
                    title: "Error",
                    description: "Project not found.",
                    variant: "destructive",
                });
                return;
            }

            const htmlContent = projectData.data.map(item =>
                `<p style="margin-bottom: 1rem"><strong>${item.question}</strong> <br> ${item.answer}</p>`
            ).join('');
            setProductsData(htmlContent);
        }
    }, [searchParams]);

    const handleRegenerate = async () => {
        setLoading(true);

        try {
            const response = await invokeBedrockAgent(newQuestion, Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
            // const response = await invokeBedrockAgent(productsData, Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
            setProductsData(response.completion);
            setNewQuestion('');
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleRegenerate();
        }
    };

    return (
        <div className={'relative w-[90%] md:w-[70%] mx-auto my-20'}>
            <div className={'flex flex-col'}>
                <div className={'relative'}>
                    <Editor license={process.env.NEXT_PUBLIC_SMART_LICENSE_KEY} onReady={initEditor} ref={editorRef} id="editor" toolbarItems={toolbarItems}>
                        <div dangerouslySetInnerHTML={{ __html: productsData }} />
                    </Editor>
                    <div className={'absolute bottom-4 left-1/2 -translate-x-1/2 border-2 p-2 rounded-3xl flex items-center w-[80%] bg-gray-100'}>
                        <input
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Ask here..."
                            className={'border-none outline-none w-full p-2 bg-transparent'}
                            onKeyDown={handleKeyDown}
                        />
                        <button className={"rounded-full p-2 bg-gray-300"} disabled={loading} onClick={handleRegenerate}>
                            { loading ? <ArrowPathIcon className={"w-4 h-4 animate-spin text-gray-500"} /> : <ChevronRightIcon className={'w-6 h-6 text-gray-500'} />   }
                        </button>
                    </div>
                </div>
                <div className={'flex items-center justify-between mt-5'}>
                    <Button className={'bg-black text-white'} onClick={() => window.history.back()} >
                        <ChevronLeftIcon className={'w-4 h-4 mr-2'}/> Back </Button>
                    <Button asChild className={'bg-teal-700 text-white'}>
                        <Link href={`/project-planner/${projectId}`}>Proceed  <ChevronRightIcon className={'w-4 h-4 ml-2'}/></Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditorForm;