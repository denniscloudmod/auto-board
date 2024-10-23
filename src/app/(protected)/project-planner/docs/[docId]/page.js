import React from "react";
import { getProjectPlan } from "@/actions/project-plan/detail";
import {MDXRemote} from "next-mdx-remote/rsc";


const EditorDetail = async ({ params }) => {
    const { docId } = params;

    try {
        const { data } = await getProjectPlan(docId);
        const { title, content } = data;

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
                    {/*<div className="prose prose-lg text-gray-700">*/}
                        <MDXRemote source={content}/>
                    {/*</div>*/}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading project plan:', error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-center">
                    Error loading project plan
                </div>
            </div>
        );
    }
};

export default EditorDetail;
