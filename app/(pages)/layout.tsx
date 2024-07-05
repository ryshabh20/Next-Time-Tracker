import React from "react";
import Image from "next/image";
import axios from "axios";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
import UserDetails from "@/helperComponents/UserDetails";
import SideBarData from "@/helperComponents/SideBarData";
import { ToastProvider } from "@/context/toastContext";

import LogoutButton from "@/helperComponents/LogoutButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const takeScreenshot = async () => {};

  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="md:w-4/12 lg:w-1/5 max-h-screen sticky top-0">
        <div className="h-1/5">
          <Image
            alt="logo"
            src="https://firebasestorage.googleapis.com/v0/b/authentication-e70b1.appspot.com/o/Screenshot%20from%202024-02-28%2015-01-08.png?alt=media&token=1f237e60-3ad6-4be0-bce7-f0c4f70edf68"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-36"
          />
        </div>
        <div className=" flex  h-4/5 flex-col  ">
          <div className="flex items-center mx-10  space-x-4">
            <UserDetails />
          </div>
          <div className=" flex flex-1 justify-between flex-col ">
            <SideBarData />

            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="bg-[#f2f2f2]  md:w-8/12 lg:w-4/5 py-16 px-10 ">
        {" "}
        <ToastProvider>{children}</ToastProvider>
      </div>
    </div>
  );
};

export default Layout;
