import {auth} from "@/auth";
// export { auth as middleware } from "@/auth";

import { NextResponse } from 'next/server'
// import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

const protectedRoutes = ['/', '/auto-board', '/project-planner', '/dashboard', '/chat', '/profile-settings', 'account-settings' ]
const publicRoutes = ['/login', '/signup',]

export default async function middleware(req) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const session = await auth()

    // 3. Decrypt the session from the cookie
    // const cookie = cookies().get('session')?.value
    // const session = await decrypt(cookie)

    // 5. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.user) {
    // if (isProtectedRoute && !session?.user?.id) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // 6. Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        session?.user?.id &&
        !req.nextUrl.pathname.startsWith('/')
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}