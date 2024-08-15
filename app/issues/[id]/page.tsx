import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const TicketDetailedPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!ticket) notFound();

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

export default TicketDetailedPage;
