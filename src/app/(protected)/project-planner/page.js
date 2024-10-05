import React from 'react';
import CreateListPlanner from "@/app/(protected)/project-planner/_components/CreateListPlanner";
import DataTable from "@/app/(protected)/project-planner/_components/DataTable";
import {projectColumns, projectEditorColumns} from "@/app/(protected)/project-planner/_components/Columns";
import EditorDataTable from "@/app/(protected)/project-planner/_components/EditorDataTable";


export const metadata = {
    title: 'AI Project Planner Questionnaire',
    description: 'Answer a few questions and let the AI generate a project plan for you.'
};



const Page = () => {



    return (
        <CreateListPlanner>
            <div className="container mx-auto py-10">
                <EditorDataTable columns={projectEditorColumns}/>
            </div>
        </CreateListPlanner>
    )
}

export default Page;
