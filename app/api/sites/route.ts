import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { siteSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = siteSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const site = await prisma.site.findUnique({
    where: { siteCode: body.siteCode },
  });

  if (site)
    return NextResponse.json({ error: "Site Already Exist" }, { status: 400 });

  const newSite = await prisma.site.create({
    data: {
      siteCode: body.siteCode,
      siteName: body.siteName,
      location: body.location,
    },
  });

  return NextResponse.json(newSite, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const sites = await prisma.site.findMany({
    orderBy: { siteCode: "asc" },
    where: { active: true },
  });

  return NextResponse.json(sites);
}
