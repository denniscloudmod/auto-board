import {Loader2} from "lucide-react";
import React from "react";

const Loader = () => {
  return (
      // <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
      //   <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      // </div>

      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-black">
          <Loader2 strokeWidth={1} className="h-8 w-8 animate-spin text-black"/>
      </div>
  );
};

export default Loader;
