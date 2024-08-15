import React from "react";
import TicketForm from "../../_components/TicketForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditTicketDetailsPage = async ({ params }: Props) => {
  const selectedTicket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!selectedTicket) notFound();

  return (
    <div>
      <TicketForm ticket={selectedTicket} />
    </div>
  );
};

export default EditTicketDetailsPage;
