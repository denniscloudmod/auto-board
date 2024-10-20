import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/db";


export const { handlers, signIn, signOut, auth } = NextAuth({
    // page: {
    //     signIn: "/login",
    // },
    // callbacks: {
    //     authorized({ auth, request: { nextUrl } }) {
    //         const isLoggedIn = !!auth?.user;
    //         const isOnDashboard = nextUrl.pathname.startsWith('/');
    //         if (isOnDashboard) {
    //             return isLoggedIn;
    //              // Redirect unauthenticated users to login page
    //         } else if (isLoggedIn) {
    //             return Response.redirect(new URL('/', nextUrl));
    //         }
    //         return true;
    //     },
    // },
    adapter: DrizzleAdapter(db),
    providers: [Google],
})