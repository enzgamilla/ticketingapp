import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { CustomLink, StatusBadge } from "../components";
import Pagination from "../components/Pagination";
import AddIssueBtn from "./AddIssueBtn";

interface Props {
  searchParams: {
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const tickets = await prisma.ticket.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const ticketCount = await prisma.ticket.findMany();

  return (
    <div className="space-y-3 p-3">
      <AddIssueBtn />
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
                <CustomLink href={`/issues/${ticket.id}`}>
                  {ticket.title}
                </CustomLink>
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
