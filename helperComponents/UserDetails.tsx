import { auth } from "@/auth";
import InfoLoader from "@/helperComponents/InfoLoader";
import Image from "next/image";
import React from "react";

export default async function UserDetails() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      {session?.user ? (
        <div className="flex space-x-2">
          <div className="h-12 w-12 rounded-full">
            <Image
              className="object-fill rounded-full h-full w-full"
              src={session?.user.avatar || "/default.png"}
              height={200}
              width={200}
              alt="src"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg float-left">
              {session?.user.name || "loading"}
            </span>
            <span className="text-custom-green text-lg">
              {session?.user?.team || "loading"}
            </span>
          </div>
        </div>
      ) : (
        <InfoLoader />
      )}
    </div>
  );
}
