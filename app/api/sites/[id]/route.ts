import { patchSiteSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchSiteSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { siteName, location, active } = body;

  const updateSite = await prisma.site.update({
    where: {
      id: params.id,
    },
    data: {
      siteName,
      location,
      active,
    },
  });

  return NextResponse.json(updateSite, { status: 201 });
}
