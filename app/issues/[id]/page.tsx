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
    <div>
      <Heading>{ticket?.title}</Heading>
      <Flex gap="3" my="2">
        <StatusBadge status={ticket.status} />
        <Text>{ticket?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="5">
        <ReactMarkdown>{ticket?.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default TicketDetailedPage;
