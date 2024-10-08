import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusBadge from "./StatusBadge";
import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dges6v6ct",
  },
});

const isGoogleImage = (url: string): boolean => {
  return url.includes("googleusercontent.com");
};

const LatestTickets = async ({
  currentLoggedIn,
  siteCode,
}: {
  currentLoggedIn: string;
  siteCode: string;
}) => {
  const tickets =
    currentLoggedIn === "ADMIN"
      ? await prisma.ticket.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          include: {
            assignedToUser: true,
          },
        })
      : await prisma.ticket.findMany({
          where: { siteCode },
          orderBy: { createdAt: "desc" },
          take: 5,
          include: {
            assignedToUser: true,
          },
        });

  return (
    <Card className="mx-4">
      <Heading size="4" mb="5">
        Latest Tickets
      </Heading>
      <Table.Root>
        <Table.Body>
          {tickets.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                    <StatusBadge status={ticket.status} />
                  </Flex>
                  {ticket.assignedToUser &&
                    (isGoogleImage(ticket.assignedToUser.image) ? (
                      <Avatar
                        fallback="?"
                        radius="full"
                        size="2"
                        src={ticket.assignedToUser?.image}
                      />
                    ) : (
                      <Avatar
                        fallback="?"
                        radius="full"
                        size="2"
                        src={cloudinary
                          .image(ticket.assignedToUser?.image)
                          .toURL()}
                      />
                    ))}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export const dynamic = "force-dynamic";

export default LatestTickets;
