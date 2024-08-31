import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/authOptions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const users = await prisma.userAccount.findUnique({
    where: { id: params.id },
  });

  if (!users)
    return NextResponse.json({ error: "User not found" }, { status: 401 });

  return NextResponse.json(users, { status: 200 });
}
