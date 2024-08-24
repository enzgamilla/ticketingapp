import prisma from "@/prisma/client";
import IssueSummary from "./components/IssueSummary";
import LatestIssue from "./components/LatestIssue";

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
    <div>
      <IssueSummary open={open} inProgress={inprogress} closed={closed} />
    </div>
  );
}
