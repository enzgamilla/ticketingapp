import { StatusBadge } from "@/app/components";
import { Ticket } from "@prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
  return (
    <>
      <div className="prose space-y-2">
        <Heading>{ticket?.title}</Heading>
        <div className="flex justify-between">
          <StatusBadge status={ticket.status} />
          <Text>
            {ticket?.createdAt.toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
        </div>
      </div>
      <Card className="prose" mt="5">
        <ReactMarkdown>{ticket?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TicketDetails;
