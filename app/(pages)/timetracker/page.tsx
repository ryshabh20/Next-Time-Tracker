"use server";

import { CreateTimeEntry } from "@/app/ui/dashboard/CreateTimeEntry";
import { TimeEntries } from "@/app/ui/dashboard/TimeEntries";
import GetCookie from "@/helperComponents/getcookies";
import { Suspense } from "react";
import Loading from "./loading";
import { BASE_URL } from "@/utils/BaseUrl";

async function Data() {
  const cookie = await GetCookie();
  try {
    const url = BASE_URL + `users/getalltimeentries`;
    const res = await fetch(url, {
      next: { tags: ["timeentries"] },
      headers: {
        Cookie: `authjs.session-token=${cookie}`,
      },
    });
    const response = await res.json();

    return {
      success: response.success,
      timeEntries: response.data,
      duration: response.duration,
    };
  } catch (error) {
    return {
      loading: false,
      success: false,
      message: "Error fetching the entries",
      timeEntries: [],
    };
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await Data();
  const groupEntries: TimeTrackerEntries[] = data.timeEntries;
  const duration: { _id: string; totalDuration: number }[] = data.duration;

  return (
    <div>
      <CreateTimeEntry />
      <Suspense fallback={<Loading />}>
        <TimeEntries groupEntries={groupEntries} duration={duration} />
      </Suspense>
    </div>
  );
}
