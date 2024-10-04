import React from 'react';
import GoogleSignIn from "@/app/(auth)/_components/GoogleSignIn";
import {auth} from "@/auth";

const Page = () => {

    // const session = await auth()
    // //
    // console.log("session 2", session)

    return (
        <GoogleSignIn/>
    );
};

export default Page;