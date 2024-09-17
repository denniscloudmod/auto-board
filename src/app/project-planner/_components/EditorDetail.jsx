'use client';
import {ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import {Editor} from "smart-webcomponents-react/editor";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {toast} from "@/hooks/use-toast";
import {invokeBedrockAgent} from "@/actions/invoke-agent";

const EditorDetail = ({editorId}) => {



    const editorRef = useRef(null);
    const [productsData, setProductsData] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSavingPlan, setIsSavingPlan] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const toolbarItems = ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'FontName', 'FontSize', 'FontColor',
        'BackgroundColor', 'LowerCase', 'UpperCase', '|', 'Formats', 'Alignment', 'OrderedList', 'UnorderedList', 'Outdent',
        'Indent', '|', 'hyperlink', 'table', 'Image', '|', 'ClearFormat ', 'Print', 'SourceCode', 'splitmode', 'FullScreen', '|', 'Undo',
        'Redo', 'subscript', 'superscript', 'delete'];

    const initEditor = () => {
        editorRef.current?.expandToolbar();
    };

    useEffect(() => {
        const data = localStorage.getItem('plannerQuestionnaires');
        if (data) {
            const parsedData = JSON.parse(data);
            const projectData = parsedData.find(project => project.id === editorId);

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

            if (projectData.generatedPlan) {
                setProductsData(projectData.generatedPlan);
                return;
            }
            setProductsData(htmlContent);
        }
    }, [editorId]);

    const handleRegenerate = async () => {
        setIsGenerating(true);

        try {
            const response = await invokeBedrockAgent(newQuestion, Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
            setProductsData(response.completion);
            setNewQuestion('');
        } catch (error) {
            console.log('errorsss11', error);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleRegenerate();
        }
    };


    const generateUpdatedAt = () => {
        return new Date().toISOString().split('T')[0];
    }

    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (event) => {
        setEditorContent(event.detail.value);
    };

    const handleSavePlan = () => {
        setIsSavingPlan(true);
        try {
            const existingQuestionnaires = JSON.parse(localStorage.getItem('plannerQuestionnaires')) || [];
            const updatedQuestionnaires = existingQuestionnaires.map(questionnaire => {
                if (questionnaire.id === editorId) {
                    return {
                        ...questionnaire,
                        generatedPlan: editorContent,
                        lastUpdated: generateUpdatedAt()
                    };
                }
                return questionnaire;
            });

            localStorage.setItem('plannerQuestionnaires', JSON.stringify(updatedQuestionnaires));

            setProductsData(editorContent);
            toast({
                title: "Success",
                description: "Plan saved successfully",
                variant: "primary",
            });

        } catch (error) {
            console.log('errorsss2', error);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSavingPlan(false);
        }
    };

    return (
            <div className={'relative w-[90%] md:w-[70%] mx-auto my-20'}>
                <div className={'flex flex-col'}>
                    <div className={'relative'}>
                        <Editor
                            onChange={handleEditorChange}
                            license="8414516F-15A2-4D84-A7AF-A9A72400DB02"
                            onReady={initEditor}
                            ref={editorRef}
                            id="editor"
                            toolbarItems={toolbarItems}>
                            <div dangerouslySetInnerHTML={{__html: productsData}}/>
                        </Editor>

                        <div
                            className={'absolute bottom-4 left-1/2 -translate-x-1/2 border-2 p-2 rounded-3xl flex items-center w-[80%] bg-gray-100'}>
                            <input
                                type="text"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Ask here..."
                                className={'border-none outline-none w-full p-2 bg-transparent'}
                                onKeyDown={handleKeyDown}
                            />
                            <button className={"rounded-full p-2 bg-gray-300"} disabled={isGenerating}
                                    onClick={handleRegenerate}>
                                {isGenerating ? <ArrowPathIcon className={"w-4 h-4 animate-spin text-gray-500"}/> :
                                    <ChevronRightIcon className={'w-6 h-6 text-gray-500'}/>}
                            </button>
                        </div>
                    </div>
                    <div className={'flex items-center justify-end mt-5'}>
                        <Button onClick={handleSavePlan} className={'bg-teal-700 text-white'}>
                            Save {isSavingPlan ? <Loader2 className={"w-4 h-4 animate-spin text-gray-500"}/> :
                            <ChevronRightIcon className={'w-4 h-4 ml-2'}/>}
                        </Button>
                    </div>
                </div>
            </div>
    );
};

export default EditorDetail;