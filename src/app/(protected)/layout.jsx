"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import React, { useEffect, useState } from "react";
import Loader from "@/app/(protected)/_components/common/Loader";
import DefaultLayout from "@/app/(protected)/_components/Layouts/DefaultLayout";

export default function RootLayout({children}) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [loading, setLoading] = useState(true);

  // const pathname = usePathname();

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
      <div suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <DefaultLayout>
                {children}
            </DefaultLayout>
            {/*{loading ? <Loader /> : <DefaultLayout> {children} </DefaultLayout> }*/}
        </div>
      </div>
  );
}
