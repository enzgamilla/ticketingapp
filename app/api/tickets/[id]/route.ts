import { patchTicketSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = patchTicketSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  const getTicket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!getTicket) return NextResponse.json("Ticket not found", { status: 404 });

  const updateTicket = await prisma.ticket.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updateTicket);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const getTicket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!getTicket) return NextResponse.json("Ticket not found", { status: 401 });

  await prisma.ticket.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json({});
}
