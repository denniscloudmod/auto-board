import React from 'react';
import {MDXRemote} from "next-mdx-remote/rsc";

const MdxChatText = ({source}) => {
    return (
        <MDXRemote source={source}/>
    );
};

export default MdxChatText;