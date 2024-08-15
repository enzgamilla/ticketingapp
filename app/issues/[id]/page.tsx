import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
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
    <Grid columns={{ initial: "1", md: "2" }} gap="7">
      <Box>
        <TicketDetails ticket={ticket} />
      </Box>
      <Box>
        <EditIssueButton ticketId={ticket.id} />
      </Box>
    </Grid>
  );
};

export default TicketPage;
