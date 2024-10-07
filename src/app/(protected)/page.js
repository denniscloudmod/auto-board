import React from 'react';
import WelcomeScreen from "@/components/WelcomeScreen";
import CreateListPlanner from "@/app/(protected)/project-planner/_components/CreateListPlanner";
import EditorDataTable from "@/app/(protected)/project-planner/_components/EditorDataTable";
import {projectEditorColumns} from "@/app/(protected)/project-planner/_components/Columns";
import PortalContainer from "@/app/(protected)/_components/PortalContainer";




export const metadata = {
    title: 'Workspace',
    description: 'Auto Boards - Project Plans'
};


const Page = () => {
    return (
        // <WelcomeScreen/>
        <PortalContainer>
            <CreateListPlanner>
                <div className="container mx-auto py-10">
                    <EditorDataTable columns={projectEditorColumns}/>
                </div>
            </CreateListPlanner>
        </PortalContainer>
    );
};

export default Page;