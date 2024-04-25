import { useAppSelector } from "@/store/store";
// import { useState } from "react";

export default function Button({
  loading,
  handleOnSubmit,
}: {
  handleOnSubmit: () => Promise<void>;
  loading: boolean;
}) {
  const user = useAppSelector((state) => state?.userData);
  const handleSubmit = () => {
    handleOnSubmit();
  };
  return (
    <button
      type="submit"
      className={`bg-custom-green text-white px-5 ${
        loading ? "bg-gray-400" : "bg-custom-green"
      }`}
      onClick={handleSubmit}
      disabled={loading}
    >
      {user?.isTimer ? "Stop" : "Start"}
    </button>
  );
}
