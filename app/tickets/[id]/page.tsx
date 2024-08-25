import prisma from "@/prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import TicketDetails from "./TicketDetails";
import AssigneeSelectUser from "./AssigneeSelectUser";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const getUser = cache((ticketId: number) =>
  prisma.ticket.findUnique({ where: { id: ticketId } })
);

const TicketPage = async ({ params }: Props) => {
  const ticket = await getUser(parseInt(params.id));

  if (!ticket) notFound();

  return (
    <div>
      <Flex justify="center" gap="7" pt="9">
        <Box width="70%">
          <TicketDetails ticket={ticket} />
        </Box>
        <Box>
          <Flex direction="column" gap="2">
            <AssigneeSelectUser ticket={ticket} />
            <EditIssueButton ticketId={ticket.id} />
            <DeleteIssueButton ticketId={ticket.id} />
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const ticket = await getUser(parseInt(params.id));

  return {
    title: ticket?.title,
    description: "Details of ticket " + ticket?.id,
  };
}

export default TicketPage;
