"use client";
import { authenticate } from "@/lib/actions";
import Image from "next/image";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginPage() {
  const [errorMessage, formAction] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#f2f2f2]">
      <Image
        alt="logo"
        src="https://firebasestorage.googleapis.com/v0/b/authentication-e70b1.appspot.com/o/Screenshot%20from%202024-02-23%2018-47-57.png?alt=media&token=1fab8603-9b12-470e-935c-5ad02908eb14"
        width="0"
        height="0"
        sizes="100vw"
        className="w-64 h-auto"
      />
      <div className="bg-white w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg mb-36 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-500 mb-4">Log in</h1>
        <form className="flex flex-col space-y-4" action={formAction}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <div className="flex flex-row justify-between">
            <div>
              <input
                className="checked:bg-custom-green"
                type="checkbox"
                name="stayLoggedIn"
                id="loggedIn"
              ></input>
              <label className="pl-2" htmlFor="loggedIn">
                Stay logged in
              </label>
            </div>
            <span className="underline text-custom-green">Forgot Password</span>
          </div>
          <div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
          <LoginButton pending={pending} />
        </form>
      </div>
    </div>
  );
}

function LoginButton({ pending }: { pending: boolean }) {
  return (
    <button
      className="w-full p-2 rounded-md bg-custom-green text-white "
      aria-disabled={pending}
      type="submit"
    >
      {pending ? "Loading..." : "Login"}
    </button>
  );
}
