import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { siteSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = siteSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const site = await prisma.site.findUnique({
    where: { siteCode: body.siteCode, siteName: body.siteName },
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
