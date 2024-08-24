import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { CustomLink, StatusBadge } from "../components";
import Pagination from "../components/Pagination";
import AddIssueBtn from "./AddIssueBtn";
import FIlterStatus from "./FIlterStatus";
import { Status } from "@prisma/client";

interface Props {
  searchParams: {
    page: string;
    status: Status;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; // to check if the status url is valid Status value from prisma

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const tickets = await prisma.ticket.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      status: status,
    },
  });

  const ticketCount = await prisma.ticket.findMany({
    where: {
      status: status,
    },
  });

  return (
    <div className="space-y-3 p-3">
      <Flex direction="row" gap="2" justify="between">
        <FIlterStatus />
        <AddIssueBtn />
      </Flex>
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
              <Table.Cell>
                <CustomLink href={`/tickets/${ticket.id}`}>
                  {ticket.title}
                </CustomLink>
              </Table.Cell>
              <Table.Cell>{<StatusBadge status={ticket.status} />}</Table.Cell>
              <Table.Cell>{ticket.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex justify="center">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={ticketCount.length}
        />
      </Flex>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
