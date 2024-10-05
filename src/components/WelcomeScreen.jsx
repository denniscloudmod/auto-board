import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronRight, GitCommitHorizontal, Minus} from "lucide-react";

const WelcomeScreen = () => {
    return (
        <div className={'h-screen'}>
            <div className={'flex flex-col items-center justify-center h-full'}>
                <div className={'flex flex-col item-center justify-center space-y-8 mb-12'}>
                    <h1 className={'text-3xl font-bold text-center'}>Workspace</h1>
                    <span className={'text-2xl flex items-center justify-center space-x-4'}>
                            <Link className={'underline hover:text-gray-500'} href={'/auto-board'}>Auto Boards</Link>
                         <Minus className={'h-4 w-4'}/>
                            <Link className={'underline hover:text-gray-500'} href={'/project-planner'}>Project Plans</Link>
                    </span>
                </div>
                <div className={'flex flex-col item-center justify-center'}>
                    <div className={'text-2xl font-semibold mb-4'}>New Project</div>
                    <div className={'flex flex-col item-center justify-center space-y-2'}>
                        <Button asChild className={'hover:border-2 bg-black text-white hover:bg-white hover:text-black'}>
                            <Link href={'/auto-board'}>  Manually <ChevronRight className={'ml-2 h-4 w-4'}/> </Link>
                        </Button>
                        <Button asChild variant={'outline'} className={'border-2 hover:bg-gray-800 hover:text-white'}>
                             <Link href={'/project-planner/questionnaire'}> With AI <ChevronRight className={'ml-2 h-4 w-4'}/></Link>
                        </Button>
                        {/*<Button asChild variant={'outline'} className={'border-2 hover:bg-gray-800 hover:text-white'}>*/}
                        {/*     <Link href={'/my-editor'}> My Editor <ChevronRight className={'ml-2 h-4 w-4'}/></Link>*/}
                        {/*</Button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;