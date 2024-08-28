import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  closed: number;
}

const TicketSummary = ({ open, closed }: Props) => {
  const container: { label: string; value: number; status: Status }[] = [
    { label: "Open Ticket", value: open, status: "OPEN" },
    { label: "Closed Ticket", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="3">
      {container.map((summary) => (
        <Card key={summary.label}>
          <Flex direction="column" gap="1">
            <Link
              className="font-medium text-sm"
              href={`/tickets/?status=${summary.status}`}
            >
              {summary.label}
            </Link>
            <Text size="2" className="font-bold">
              {summary.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default TicketSummary;
