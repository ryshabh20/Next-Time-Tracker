"use client";
import Link from "next/link";
import { FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
import { notify } from "@/utils/Notify";
import axios from "axios";
import { dynamicaction } from "@/helper/action";

export default function Modal({
  Id,
  deleteroute,
  editroute,
  accessroute,
  tag,
  details,
  setShowModal,
  showModal,
}: {
  Id: string;
  deleteroute: string;
  editroute: string;
  details?: string;
  accessroute?: string;
  tag: string;
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`${deleteroute}/${showModal}`);
      if (response.data.success) {
        notify(response.data.success, response.data.message);
      }
      dynamicaction(tag);
      setShowModal("");
    } catch (err: any) {
      notify(err.response.data.success, err.response.data.message);
    }
  };

  return (
    <td className="relative foucs:border focus-within:border-red-500">
      <FaEllipsisV
        onClick={() => {
          if (showModal === Id) {
            setShowModal("");
          } else {
            setShowModal(Id);
          }
        }}
        className="hover:cursor-pointer"
      />
      {showModal === Id && (
        <div className="absolute bg-white z-10  shadow-lg border ">
          {details && (
            <Link href={`${details}/${Id}`}>
              <div className="px-2 py-1 border-b hover:bg-gray-400 ">
                Details
              </div>
            </Link>
          )}
          <Link href={`${editroute}/${Id}`}>
            <div className="px-2 py-1 border-b hover:bg-gray-400 ">Edit</div>
          </Link>
          <div onClick={deleteHandler} className="px-2 py-1  hover:bg-red-400">
            Delete
          </div>
          {accessroute && (
            <Link href={`${accessroute}/${Id}`}>
              <div className="px-2 py-1 border-b hover:bg-gray-400 ">
                Edit Access
              </div>
            </Link>
          )}
        </div>
      )}
    </td>
  );
}
