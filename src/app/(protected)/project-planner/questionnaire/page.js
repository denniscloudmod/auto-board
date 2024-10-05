import React from "react";
import {invokeBedrockAgent} from "@/actions/invoke-agent";
import QuestionnaireForm from "@/app/(protected)/project-planner/_components/QuestionnaireForm";
import Chat from "@/app/(protected)/project-planner/_components/Chat";
import WorkSpaceBackButton from "@/components/WorkSpaceBackButton";

export const metadata = {
    title: 'AI Project Planner Questionnaire',
    description: 'Answer a few questions and let the AI generate a project plan for you.'
};

const Page = () => {
  return (
      <>
          <WorkSpaceBackButton/>
          <div className={'flex items-center justify-center w-full mt-20'}>
            <QuestionnaireForm/>
          </div>
      </>
  );
};

export default Page;