import {ChevronLeftIcon} from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";
import {invokeBedrockAgent} from "@/actions/invoke-agent";
import EditorDetail from "@/app/project-planner/_components/EditorDetail";

const Page = ({params}) => {

  const { editorId } = params;


  return (
      <div>
          <Link
              className={'absolute top-2 left-2 md:top-6 md:left-6 flex items-center gap-2 text-sm md:text-lg hover:text-gray-400 '}
              href={'/project-planner'}>
              <ChevronLeftIcon className="h-6 w-6"/> <span>Back</span> </Link>
              <EditorDetail editorId={editorId}/>
      </div>
  );
};

export default Page;