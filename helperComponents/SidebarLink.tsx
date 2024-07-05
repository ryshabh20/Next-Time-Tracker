"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IconType {
  name: string;
  icon: JSX.Element;
  page: string;
}
export const SidebarLink = ({ data }: { data: IconType }) => {
  const pathname = usePathname();

  const currentPath = "/" + pathname.split("/")[1];
  return (
    <Link href={data.page}>
      <div
        className={`hover:bg-[#00a7b1] group hover:text-white ${
          currentPath === data.page
            ? "bg-[#00a7b1] text-white"
            : "bg-white text-black"
        }`}
      >
        <div className="flex items-center hover:text-white  lg:w-max-content mx-10 pl-1 py-2 my-3 cursor-pointer">
          <div
            className={`${
              currentPath === data.page ? "text-white" : "text-black"
            }`}
          >
            {React.cloneElement(data.icon, {
              className: `w-9 h-9 group-hover:text-white ${
                currentPath === data.page ? "text-white" : "text-gray-600 "
              }`,
            })}
          </div>
          <div className="ml-4 text-lg">{data.name}</div>
        </div>
      </div>
    </Link>
  );
};
