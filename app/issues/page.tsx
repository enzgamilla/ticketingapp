import prisma from "@/prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TableTicket from "../components/TableTicket";
import delay from "delay";
import AddIssueBtn from "./AddIssueBtn";

const IssuesPage = async () => {
  const issues: any = await prisma.ticket.findMany();
  delay(2000);

  return (
    <div>
      <AddIssueBtn />
      <TableTicket tickets={issues} />
    </div>
  );
};

export default IssuesPage;
