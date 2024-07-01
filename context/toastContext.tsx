"use client";
export const toastProvider = () => {};

import React, { createContext, useState, useContext } from "react";
import { ToastOptions, ToastType, Toaster, toast } from "react-hot-toast";

interface ToastContextType {
  handleToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  handleToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const handleToast = (message: string, type: ToastType = "blank") => {
    if (type === "blank") return;
    toast[type](message, {
      position: "bottom-right",
    });
  };
  return (
    <ToastContext.Provider value={{ handleToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
