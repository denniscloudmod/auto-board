import React from 'react';
import CreateListPlanner from "@/app/project-planner/_components/CreateListPlanner";
import DataTable from "@/app/project-planner/_components/DataTable";
// import {aiProjects} from "@/data/projects";
import {projectColumns} from "@/app/project-planner/_components/Columns";


export const metadata = {
    title: 'AI Project Planner Questionnaire',
    description: 'Answer a few questions and let the AI generate a project plan for you.'
};

// async function getData(){
//     return aiProjects
// }


const Page = () => {



    // const data = await getData()


    return (
        <CreateListPlanner>
            <div className="container mx-auto py-10">
                <DataTable columns={projectColumns}/>
                {/*<DataTable columns={projectColumns} data={data}/>*/}
            </div>
        </CreateListPlanner>
    )
}

export default Page;
