import prisma from "@/prisma/client";
import TicketChart from "@/app/components/TicketChart";
import { Flex, Grid } from "@radix-ui/themes";
import TicketSummary from "@/app/components/TicketSummary";
import LatestIssue from "@/app/components/LatestIssue";

export default async function Home() {
  const open = await prisma.ticket.count({
    where: {
      status: "OPEN",
    },
  });
  const inprogress = await prisma.ticket.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closed = await prisma.ticket.count({
    where: {
      status: "CLOSED",
    },
  });

  return (
    <Grid columns="2" gap="5" m="9">
      <Flex direction="column" gap="5">
        <TicketSummary open={open} inProgress={inprogress} closed={closed} />
        <TicketChart open={open} inProgress={inprogress} closed={closed} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}
