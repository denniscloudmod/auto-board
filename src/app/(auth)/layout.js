import {auth} from "@/auth";
import {redirect} from "next/navigation";

export const metadata = {
    title: "Auto Boards - Login",
    description: "Auto Boards - Project Plans",
};

export default async function AuthLayout({children}) {

    const session = await auth()

    if (session?.user) {
        redirect("/")
    }


    return (
        <>
        {children}
        </>
    );
}
