import prisma from "@/prisma/client";
import TicketChart from "@/app/components/TicketChart";
import { Flex, Grid } from "@radix-ui/themes";
import TicketSummary from "@/app/components/TicketSummary";
import LatestIssue from "@/app/components/LatestIssue";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.ticket.count({
    where: {
      status: "OPEN",
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
        <TicketSummary open={open} closed={closed} />
        <TicketChart open={open} closed={closed} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Ticketing App - Dashboard",
  description: "View summary of tickets",
};
