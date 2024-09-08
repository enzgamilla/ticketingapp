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

  const sitesWithOpenTIckets = await prisma.site.findMany({
    select: {
      siteCode: true,
      _count: {
        select: { Ticket: { where: { status: "OPEN" } } },
      },
    },
  });

  const charDataList = sitesWithOpenTIckets
    .filter((res) => res._count.Ticket > 0)
    .map((res) => ({
      label: res.siteCode,
      value: res._count.Ticket,
    }));

  return (
    <Grid columns="2" gap="5" m="9">
      <Flex direction="column" gap="5">
        <TicketChart openTickets={charDataList} />
        <TicketSummary open={open} closed={closed} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Ticketing App - Dashboard",
  description: "View summary of tickets",
};
