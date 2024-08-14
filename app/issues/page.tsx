import prisma from "@/prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TableTicket from "../components/TableTicket";

const IssuesPage = async () => {
  const issues: any = await prisma.ticket.findMany();

  return (
    <div>
      <div className="mb-4">
        <Button>
          <Link href="/issues/new">New Ticket</Link>
        </Button>
      </div>
      <TableTicket tickets={issues} />
    </div>
  );
};

export default IssuesPage;
