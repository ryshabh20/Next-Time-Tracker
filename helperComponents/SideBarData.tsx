import { RxDashboard } from "react-icons/rx";
import { LuClock } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";
import { ImFilesEmpty } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";
import React from "react";
import Link from "next/link";
// import { useAppSelector } from "@/store/store";

import { MdPeopleOutline } from "react-icons/md";
// import { usePathname } from "next/navigation";
import { auth } from "@/auth";
import { SidebarLink } from "./SidebarLink";

const sideBarDataAdmin = [
  {
    name: "Dashboard",
    icon: <RxDashboard />,
    page: "/dashboard",
  },
  {
    name: "Time Tracker",
    icon: <LuClock />,
    page: "/timetracker",
  },
  {
    name: "Projects",
    icon: <GrNotes />,
    page: "/projects",
  },
  {
    name: "Clients",
    icon: <VscAccount />,
    page: "/clients",
  },
  {
    name: "Employees",
    icon: <MdPeopleOutline />,
    page: "/employees",
  },
  {
    name: "Screenshots",
    icon: <ImFilesEmpty />,
    page: "/screenshots",
  },
];

const sideBarDataClient = [
  {
    name: "Dashboard",
    icon: <RxDashboard />,
    page: "/dashboard",
  },
  {
    name: "Time Tracker",
    icon: <LuClock />,
    page: "/timetracker",
  },
  {
    name: "Projects",
    icon: <GrNotes />,
    page: "/projects",
  },

  {
    name: "Screenshots",
    icon: <ImFilesEmpty />,
    page: "/screenshots",
  },
];
const SideBarData = async () => {
  const session = await auth();

  return (
    <div>
      {session?.user.role === "admin"
        ? sideBarDataAdmin.map((data, index) => (
            <SidebarLink data={data} key={index} />
          ))
        : sideBarDataClient.map((data, index) => (
            <SidebarLink data={data} key={index} />
          ))}
    </div>
  );
};

export default SideBarData;
