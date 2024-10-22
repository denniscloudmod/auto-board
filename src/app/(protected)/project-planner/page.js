
import React from 'react';
import CreateListPlanner from "@/app/(protected)/project-planner/_components/CreateListPlanner";
import {projectPlannerColumns} from "@/app/(protected)/project-planner/_components/Columns";
import EditorDataTable from "@/app/(protected)/project-planner/_components/EditorDataTable";
import PortalContainer from "@/app/(protected)/_components/PortalContainer";
import PlannerWorkspaceTable from "@/app/(protected)/project-planner/_components/PlannerWorkspaceTable";


export const metadata = {
    title: 'AI Project Planner Questionnaire',
    description: 'Answer a few questions and let the AI generate a project plan for you.'
};



const Page = () => {



    return (
        <PortalContainer>
            <CreateListPlanner>
                <div className="container mx-auto py-10">
                    {/*<EditorDataTable columns={projectPlannerColumns}/>*/}
                    <PlannerWorkspaceTable/>
                </div>
            </CreateListPlanner>
        </PortalContainer>
    )
}

export default Page;
