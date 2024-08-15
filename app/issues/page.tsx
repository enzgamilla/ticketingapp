import prisma from "@/prisma/client";
import React from "react";
import AddIssueBtn from "./AddIssueBtn";
import TableTicket from "./TableTicket";

const IssuesPage = async () => {
  const issues: any = await prisma.ticket.findMany();

  return (
    <div>
      <AddIssueBtn />
      <TableTicket tickets={issues} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
