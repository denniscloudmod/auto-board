import React from 'react';
import Link from "next/link";
import {ChevronLeftIcon} from "@heroicons/react/16/solid";

const WorkSpaceBackButton = () => {
    return (
        <Link className={'absolute top-2 left-2 md:top-6 md:left-6 flex items-center gap-2 text-sm md:text-lg hover:text-gray-400 '} href={'/'}>
            <ChevronLeftIcon className="h-6 w-6"/> <span>WorkSpace</span> </Link>
    );
};

export default WorkSpaceBackButton;