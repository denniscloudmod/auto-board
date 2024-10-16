// import React from 'react';
// import WelcomeScreen from "@/components/WelcomeScreen";
// import CreateListPlanner from "@/app/(protected)/project-planner/_components/CreateListPlanner";
// import EditorDataTable from "@/app/(protected)/project-planner/_components/EditorDataTable";
// import {projectEditorColumns} from "@/app/(protected)/project-planner/_components/Columns";
// import PortalContainer from "@/app/(protected)/_components/PortalContainer";
//
//
//
//
// export const metadata = {
//     title: 'Workspace',
//     description: 'Auto Boards - Project Plans'
// };
//
//
// const Page = () => {
//     return (
//         // <WelcomeScreen/>
//         <PortalContainer>
//             <CreateListPlanner>
//                 <div className="container mx-auto py-10">
//                     <EditorDataTable columns={projectEditorColumns}/>
//                 </div>
//             </CreateListPlanner>
//         </PortalContainer>
//     );
// };
//
// export default Page;

import React from 'react';
import AutoBoardCreateList from "@/app/(protected)/auto-board/_component/AutoBoardCreateList";
import WorkSpaceBackButton from "@/components/WorkSpaceBackButton";
import DataTable from "@/app/(protected)/project-planner/_components/DataTable";
import {projectColumns} from "@/app/(protected)/project-planner/_components/Columns";
import PortalContainer from "@/app/(protected)/_components/PortalContainer";

export const metadata = {
    title: 'Dashboard | Auto board',
    description: 'Auto board Dashboard'
};


const Page = () => {
    return (
        <PortalContainer>
            <WorkSpaceBackButton/>
            <AutoBoardCreateList/>
        </PortalContainer>
    );
};

export default Page;

