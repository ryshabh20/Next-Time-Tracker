import { auth } from "@/auth";
import { connect } from "@/db/dbConfig";
import Project from "@/db/models/projectSchema";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // const user = await tokenDataId(request, true);
    const session = await auth();
    const user = session?.user;

    if (user?.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorised to change access" },
        { status: 401 }
      );
    } else {
      const id = await request.json();
      const project = await Project.findById(id).populate("assignedMembers", [
        "email",
        "department",
        "code",
        "employeename",
      ]);
      if (!project) {
        return NextResponse.json(
          {
            message: "No project exists with that Id",
          },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          {
            projectDetail: project,
            message: "Project with populated employee fetched successfully",
          },
          { status: 200 }
        );
      }
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
