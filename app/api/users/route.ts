import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/authOptions";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    where: { name: { not: "" } },
  });

  return NextResponse.json(users);
}
