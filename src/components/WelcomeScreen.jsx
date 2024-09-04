import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronRight} from "lucide-react";

const WelcomeScreen = () => {
    return (
        <div className={'h-screen bg-white'}>
            <div className={'flex flex-col items-center justify-center h-full'}>
                <div className={'flex flex-col item-center justify-center space-y-2 mb-16'}>
                    <h1 className={'text-3xl font-bold text-center'}>Workspace</h1>
                    <span className={'text-xl'}>Auto Boards - Project Plans</span>
                </div>
                <div className={'flex flex-col item-center justify-center'}>
                    <div className={'text-xl font-bold mb-4'}>New Project</div>
                    <div className={'flex flex-col item-center justify-center space-y-2'}>
                        <Button asChild className={'hover:border-2 hover:bg-white hover:text-black'}>
                            <Link href={'/auto-board'}>  Manually <ChevronRight className={'ml-2 h-4 w-4'}/> </Link>
                        </Button>
                        <Button asChild variant={'outline'} className={'border-2 hover:bg-black hover:text-white'}>
                             <Link href={'/project-planner'}> With AI <ChevronRight className={'ml-2 h-4 w-4'}/></Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;