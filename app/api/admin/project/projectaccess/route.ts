import { NextResponse, NextRequest } from "next/server";
import { tokenDataId } from "@/helper/tokenData";
import Employee from "@/db/models/employeeSchema";
import { connect } from "@/db/dbConfig";
import { auth } from "@/auth";

connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();
    const user = session?.user;
    if (user?.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorised to change access" },
        { status: 401 }
      );
    } else {
      const body = await request.json();
      const filteredEmployeeByRole = await Employee.find({
        department: { $in: body },
      });
      return NextResponse.json(
        {
          message: "Project access updated successfully",
          employees: filteredEmployeeByRole,
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
