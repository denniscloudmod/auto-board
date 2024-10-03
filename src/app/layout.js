import { Inter } from "next/font/google";
import "./kanban.css";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auto Boards - Project Planner",
  description: "Auto Boards - Project Plans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body smart-license="8414516F-15A2-4D84-A7AF-A9A72400DB02" className={inter.className}>
      {children}
      <Toaster />
      </body>
    </html>
  );
}
