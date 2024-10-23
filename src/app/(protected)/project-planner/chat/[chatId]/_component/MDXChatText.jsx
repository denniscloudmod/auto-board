import React, { memo } from 'react';
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from 'react';
import {Loader2} from "lucide-react";

const MDXContent = memo(({ source }) => {
    return (
        <Suspense fallback={<div className={'flex justify-center items-center h-full'}><Loader2 className={'animate-spin h-4 w-4'}/></div>}>
            <MDXRemote source={source} />
        </Suspense>
    );
});

MDXContent.displayName = 'MDXContent';

const MdxChatText = ({ source }) => {
    if (!source) return null;

    return <MDXContent source={source} />;
};

export default memo(MdxChatText);