import React from 'react';
import AutoBoardCreateList from "@/app/(protected)/auto-board/_component/AutoBoardCreateList";
import WorkSpaceBackButton from "@/components/WorkSpaceBackButton";
import PortalContainer from "@/app/(protected)/_components/PortalContainer";

export const metadata = {
    title: 'Auto Board | Create board, Board list',
    description: 'Auto Board '
};


const Page = () => {
    return (
        <PortalContainer>
            <WorkSpaceBackButton/>
            <AutoBoardCreateList/>
            {/*<div className={'container mx-auto mt-5'}>*/}
            {/*    <div className={'text-2xl font-bold mb-5'}>Project Planner Boards</div>*/}
            {/*    <DataTable columns={projectColumns}/>*/}
            {/*</div>*/}
        </PortalContainer>
    );
};

export default Page;
