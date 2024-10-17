"use client";
import React, { useState } from "react";
import Sidebar from "@/app/(protected)/_components/Sidebar";
import Header from "@/app/(protected)/_components/Header";
import {CircleChevronRight} from "lucide-react";

export default function DefaultLayout({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHide, setSidebarHide] = useState(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <div className={`${sidebarHide && " duration-300 ease-linear hidden"}`}>
          <Sidebar sidebarHide={sidebarHide}
                   setSidebarHide={setSidebarHide} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        {/* <!-- ===== Sidebar End ===== --> */}

        {/*Close side nave on large screen*/}
        <div className={`hidden fixed top-0 l-0 w-2 h-full bg-black dark:bg-teal-200 z-9999 border-r-2 border-black ${!sidebarHide ? 'hidden' : 'lg:block'} `}>
          <CircleChevronRight onClick={() => setSidebarHide(!sidebarHide)} size={32} className={'hover:cursor-pointer bg-black dark:bg-teal-200 text-white dark:text-black rounded-full'} />
        </div>

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className={`relative flex flex-1 flex-col lg:ml-${sidebarHide ? 0 : 72.5}`}>
        {/*<div className="relative flex flex-1 flex-col lg:ml-72.5">*/}
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  showLogo={sidebarHide}/>
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl h-screen ">
            {/*<div className="mx-auto max-w-screen-2xl h-screen p-4 md:p-6 2xl:p-10">*/}
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
