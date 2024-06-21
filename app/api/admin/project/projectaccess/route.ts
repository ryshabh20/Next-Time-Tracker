import { NextResponse, NextRequest } from "next/server";
import { tokenDataId } from "@/helper/tokenData";
import Employee from "@/db/models/employeeSchema";
import { connect } from "@/db/dbConfig";

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
      const body = await request.json();
      const filteredEmployeeByRole = await Employee.find({
        department: { $in: body },
      });
      return NextResponse.json(
        {
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
