"use client";
import { useToast } from "@/context/toastContext";
const useNotify = () => {
  const { handleToast } = useToast();

  const notify = (status: boolean, message: string) => {
    if (status) {
      handleToast(message, "success");
    } else {
      handleToast(message, "error");
    }
  };

  return notify;
};

export default useNotify;
