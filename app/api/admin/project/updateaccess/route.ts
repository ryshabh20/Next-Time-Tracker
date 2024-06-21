import { connect } from "@/db/dbConfig";
import Project from "@/db/models/projectSchema";
import { tokenDataId } from "@/helper/tokenData";

import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await tokenDataId(request, true);
    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorised to change access" },
        { status: 401 }
      );
    } else {
      const { projectId, assignedMembers } = await request.json();
      const project = await Project.findById(projectId);

      project.assignedTeam = { ...project.assignedTeam, ...assignedMembers };
      const result = await project.save();
      return NextResponse.json(
        { message: "Members updated Successfully" },
        { status: 200 }
      );
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
