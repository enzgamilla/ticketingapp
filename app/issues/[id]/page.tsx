import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import TicketDetails from "./TicketDetails";

interface Props {
  params: { id: string };
}

const TicketPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!ticket) notFound();

  return (
    <Flex direction={{ initial: "column", sm: "row" }} justify="center" gap="7">
      <Box width={{ initial: "100%", sm: "70%" }}>
        <TicketDetails ticket={ticket} />
      </Box>
      <Box width={{ initial: "10rem" }}>
        <Flex direction="column" gap="2">
          <EditIssueButton ticketId={ticket.id} />
          <DeleteIssueButton ticketId={ticket.id} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default TicketPage;
