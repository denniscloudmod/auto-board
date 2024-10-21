import {invokeBedrockAgent} from "@/actions/invoke-agent";
import React from 'react';

import PlannerChat from "@/app/(protected)/project-planner/chat/[chatId]/_component/PlannerChat";

const Page = ({params}) => {
    const {chatId} = params;

    return (
        <PlannerChat chatId={chatId}/>
    );
};

export default Page;