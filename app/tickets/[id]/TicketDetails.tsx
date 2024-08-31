"use client";

import { StatusBadge } from "@/app/components";
import { Ticket } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";

const TicketDetails = ({
  ticket,
  restriction,
}: {
  ticket: Ticket;
  restriction?: string;
}) => {
  const pathNames = usePathname();
  const isAuthPage = pathNames === "/auth/login";

  return (
    <>
      <Heading>{ticket?.title}</Heading>
      <Flex className="space-x-3" justify="between">
        <div className="mt-1">
          <StatusBadge status={ticket.status} />
        </div>
        <Text>
          {ticket?.createdAt.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{ticket?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TicketDetails;
