import prisma from "@/prisma/client";
import React from "react";
import { TableTicket } from "@/app/components";
import AddIssueBtn from "./AddIssueBtn";

const IssuesPage = async () => {
  const issues: any = await prisma.ticket.findMany();

  return (
    <div>
      <AddIssueBtn />
      <TableTicket tickets={issues} />
    </div>
  );
};

export default IssuesPage;
