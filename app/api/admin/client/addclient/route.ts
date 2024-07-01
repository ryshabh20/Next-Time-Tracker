import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import Client from "@/db/models/clientSchema";

import { tokenDataId } from "@/helper/tokenData";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const user = await tokenDataId(request, true);
    const tokenId = await tokenDataId(request);
    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: 401 }
      );
    }
    const { clientname, contactnumber, email, country } = reqBody.formData;
    const newClient = await new Client({
      clientname,
      contactnumber,
      email,
      country,
      adminId: user._id,
    });
    const savedClient = newClient.save();

    return NextResponse.json(
      {
        message: "Client created successfully",
        success: true,
        savedClient,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
