import { StatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="7">
      <Box>
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
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issue/${ticket.id}/edit`}>Edit Ticket</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default TicketDetailedPage;
