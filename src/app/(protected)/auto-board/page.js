import React from 'react';
import AutoBoardCreateList from "@/app/(protected)/auto-board/_component/AutoBoardCreateList";
import WorkSpaceBackButton from "@/components/WorkSpaceBackButton";
import DataTable from "@/app/(protected)/project-planner/_components/DataTable";
import {projectColumns} from "@/app/(protected)/project-planner/_components/Columns";

export const metadata = {
    title: 'Auto Board | Create board, Board list',
    description: 'Auto Board'
};


const Page = () => {
    return (
        <>
            <WorkSpaceBackButton/>
            <AutoBoardCreateList/>
            {/*<div className={'container mx-auto mt-5'}>*/}
            {/*    <div className={'text-2xl font-bold mb-5'}>Project Planner Boards</div>*/}
            {/*    <DataTable columns={projectColumns}/>*/}
            {/*</div>*/}
        </>
    );
};

export default Page;