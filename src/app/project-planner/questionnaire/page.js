import React from "react";
import QuestionnaireForm from "@/app/project-planner/_components/QuestionnaireForm";

export const metadata = {
    title: 'AI Project Planner Questionnaire',
    description: 'Answer a few questions and let the AI generate a project plan for you.'
};

const Page = () => {
  return (
      <div className={'flex items-center justify-center w-full mt-20'}>
        <QuestionnaireForm/>
      </div>
  );
};

export default Page;