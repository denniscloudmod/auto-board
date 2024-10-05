import React from 'react';
import {Loader2} from "lucide-react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Loader2 strokeWidth={1} className="h-8 w-8 animate-spin text-black" />
        </div>
    );
};

export default Loading;