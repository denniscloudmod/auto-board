import React from 'react';
import { invokeBedrockAgent } from "@/actions/invoke-agent";
import EditorForm from "@/app/(protected)/project-planner/_components/EditorForm";
import WorkSpaceBackButton from "@/components/WorkSpaceBackButton";

export const metadata = {
    title: 'AI Project Planner Editor',
    description: 'Edit your project plan.'
};

const Page = () => {
    return (
        <>
            <WorkSpaceBackButton/>
            <EditorForm/>
        </>
    );
};

export default Page;