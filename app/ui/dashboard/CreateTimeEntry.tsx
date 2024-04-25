"use client";
import SearchableDropdown from "@/app/ui/dashboard/searchableSelect";
import Timer from "@/helperComponents/Timer";
import { useAppSelector, useAppDispatch, RootState } from "@/store/store";
import { setUserData } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { dynamicaction } from "@/helper/action";
import { notify } from "@/utils/Notify";
import dynamic from "next/dynamic";
const Button = dynamic(() => import("./Button"), { ssr: false });

export function CreateTimeEntry() {
  const user = useAppSelector((state: RootState) => state.userData);
  const dispatch = useAppDispatch();
  const [seconds, setSeconds] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState(false);
  const [task, setTask] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const project = user?.currentTask?.currentProject;

  const currentEntry = async () => {
    try {
      if (user && user?.isTimer && user.currentTask?.startedAt) {
        const currentTime = new Date().getTime();
        const startTime = new Date(user.currentTask!.startedAt!).getTime();
        const timeinMilli = currentTime - startTime;
        setSeconds(timeinMilli);
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  useEffect(() => {
    currentEntry();
  }, [user?.isTimer]);
  const projectSet = (id: string, name: string) => {
    dispatch(
      setUserData({
        ...user!,

        currentTask: {
          ...user?.currentTask,
          currentProject: { projectName: name, projectId: id },
        },
      })
    );
  };

  const handleOnSubmit = async () => {
    const EntryDetails = { task, project };
    if (!user?.isTimer) {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/timeentry", EntryDetails);

        dispatch(
          setUserData({
            ...user!,
            isTimer: response.data.updatedTimer,
            currentTask: {
              description: response.data.task,
              startedAt: response.data.startedAt,
              currentProject: {
                projectId: response.data.project.projectId,
                projectName: response.data.project.projectName,
                projectTask: "",
              },
            },
          })
        );
        setTask(response.data.task);
        setLoading(false);
        notify(response.data.success, response.data.message);
      } catch (err: any) {
        notify(err.response.data.success, err.response.data.error);
      }
    } else if (
      task.trim() !== "" &&
      user?.currentTask?.currentProject?.projectId &&
      user?.isTimer
    ) {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/timeentry", EntryDetails);
        dispatch(
          setUserData({
            ...user,
            isTimer: response.data.updatedTimer,
            currentTask: {
              ...user.currentTask,
              description: response.data.task,
              startedAt: undefined,
              currentProject: {
                projectId: response.data.project.projectId,
                projectName: response.data.project.projectName,
                projectTask: "",
              },
            },
          })
        );

        setTask(response.data.task);
        setLoading(false);
        notify(response.data.success, response.data.message);
        dynamicaction("timeentries");
      } catch (err: any) {
        notify(err.response.data.success, err.response.data.error);
      }
    } else if (
      task.trim() == "" ||
      !user?.currentTask?.currentProject?.projectId
    ) {
      notify(false, "Please fill all the fields");
    }
  };

  useEffect(() => {
    setTask(user?.currentTask?.description || "");
  }, [user?.currentTask?.description]);

  return (
    <div className="flex bg-white h-14   md:justify-between ">
      <div className=" flex p-2 w-3/6 ">
        <div className="w-full ">
          <input
            onChange={(e) => {
              setTask(e.target.value);
              setErrorMessage(false);
            }}
            className={`bg-[#f6f6f6]  w-full h-full pl-2 ${
              errorMessage ? "border border-red-700" : "hover:border-green-700"
            }`}
            value={task}
            type="text"
            placeholder={
              errorMessage
                ? "This field is required"
                : "What are you working on"
            }
            required
          ></input>
        </div>
      </div>
      <div className="flex p-2  ml-auto  md:space-x-3 lg:space-x-7 lg:mr-3">
        <div className="flex items-center border-r  ">
          <SearchableDropdown projectfn={projectSet} />
        </div>
        <Timer startTime={seconds} />
        <Button loading={loading} handleOnSubmit={handleOnSubmit}></Button>
      </div>
    </div>
  );
}
