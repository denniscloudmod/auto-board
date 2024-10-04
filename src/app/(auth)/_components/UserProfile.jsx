"use client";

import { signOut } from "@/auth"
import Image from 'next/image'
import {useEffect, useRef, useState} from "react";
// import { useState, useRef, useEffect } from 'react'

export default function UserProfile({ session }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // const handleLogout = async () => {
    //     await signOut()
    // }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!session || !session.user) {
        return null;
    }

    const { user } = session

    return (
        <div ref={dropdownRef}>
        {/*<div className="relative" ref={dropdownRef}>*/}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center focus:outline-none"
            >
                <Image
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm text-gray-700">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    {/*<hr className="border-gray-200" />*/}
                    {/*<div*/}
                    {/*    // action={async () => {*/}
                    {/*    //     "use server"*/}
                    {/*    //     await signOut()*/}
                    {/*    // }}*/}
                    {/*>*/}
                    {/*    <button*/}
                    {/*        type="submit"*/}
                    {/*        onClick={handleLogout}*/}
                    {/*        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 focus:outline-none"*/}
                    {/*    >*/}
                    {/*        Logout*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            )}
        </div>
    )
}

