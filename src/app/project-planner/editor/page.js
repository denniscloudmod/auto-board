import React from 'react';
import EditorForm from "@/app/project-planner/_components/EditorForm";

export const metadata = {
    title: 'AI Project Planner Editor',
    description: 'Edit your project plan.'
};

const Page = () => {
    return (
        <EditorForm/>
    );
};

export default Page;