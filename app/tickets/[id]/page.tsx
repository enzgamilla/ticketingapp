import prisma from "@/prisma/client";
import { Box, Button, Card, Flex } from "@radix-ui/themes";
import DeleteTicketButton from "./DeleteTicketButton";
import EditTicketButton from "./EditTicketButton";
import TicketDetails from "./TicketDetails";
import { cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import CloseTicketButton from "./CloseTicketButton";

interface Props {
  params: { id: string };
}

const getUser = cache(async (ticketId: number) => {
  return await prisma.ticket.findUnique({
    where: { id: ticketId },
  });
});

const UpdateTicketPage = async ({ params }: Props) => {
  const ticket = await getUser(parseInt(params.id));
  const session = await getServerSession(authOptions);

  const currentLogged = await prisma.userAccount.findUnique({
    where: { id: session?.user.id },
  });

  return (
    <div>
      <Card m="9">
        <Flex direction="column" gap="5" p="5">
          <Box>
            {
              <TicketDetails
                restriction={currentLogged?.restrictions}
                ticket={ticket!}
              />
            }
          </Box>
          <Box>
            <Flex gap="2">
              <EditTicketButton ticketId={ticket?.id!} />
              <DeleteTicketButton ticketId={ticket?.id!} />
              {currentLogged?.restrictions === "ADMIN" &&
                ticket?.status === "OPEN" && (
                  <CloseTicketButton ticketId={ticket?.id!} />
                )}
            </Flex>
          </Box>
        </Flex>
      </Card>
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const ticket = await getUser(parseInt(params.id));

  return {
    title: ticket?.title,
    description: "Details of ticket " + ticket?.id,
  };
}

export default UpdateTicketPage;
