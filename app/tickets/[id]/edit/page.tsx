import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import TicketFormSkeleton from "./loading";
import dynamic from "next/dynamic";

const TicketForm = dynamic(
  () => import("@/app/tickets/_components/TicketForm"),
  {
    ssr: false,
    loading: () => <TicketFormSkeleton />,
  }
);

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
