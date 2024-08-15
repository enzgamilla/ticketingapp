import { Table } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "./StatusBadge";
import Link from "next/link";

interface TicketProps {
  tickets: Array<Type>;
}

interface Type {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

const TableTicket = ({ tickets }: TicketProps) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tickets.map((ticket) => (
          <Table.Row key={ticket.id}>
            <Table.Cell className="font-bold">
              <Link href={`/issues/${ticket.id}`}>{ticket.title}</Link>
              <div className="block md:hidden">
                {<StatusBadge status={ticket.status} />}
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {<StatusBadge status={ticket.status} />}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {ticket.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TableTicket;
