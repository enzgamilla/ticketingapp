import prisma from "@/prisma/client";
import TicketChart from "@/app/components/TicketChart";
import { Flex, Grid } from "@radix-ui/themes";
import TicketSummary from "@/app/components/TicketSummary";
import LatestIssue from "@/app/components/LatestIssue";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/authOptions";
import { setEngine } from "crypto";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const open = await prisma.ticket.count({
    where: {
      status: "OPEN",
      siteCode: session?.user.siteCode,
    },
  });

  const closed = await prisma.ticket.count({
    where: {
      status: "CLOSED",
      siteCode: session?.user.siteCode,
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

  const chartAdmin = sitesWithOpenTIckets
    .filter((res) => res._count.Ticket > 0)
    .map((res) => ({
      label: res.siteCode,
      value: res._count.Ticket,
    }));

  const chartEmployee = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
  ];

  return (
    <Grid columns="2" gap="5" m="9">
      <Flex direction="column" gap="5">
        <TicketChart
          openTickets={
            session?.user.role === "ADMIN" ? chartAdmin : chartEmployee
          }
        />
        <TicketSummary
          open={open}
          closed={closed}
          titleLabel={session?.user.siteCode!}
        />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Ticketing App - Dashboard",
  description: "View summary of tickets",
};
