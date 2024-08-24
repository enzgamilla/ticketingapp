import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { CustomLink, StatusBadge } from "../components";
import Pagination from "../components/Pagination";
import AddIssueBtn from "./AddIssueBtn";
import FIlterStatus from "./FIlterStatus";
import { Status, Ticket } from "@prisma/client";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    page: string;
    orderBy: keyof Ticket;
    orderDirection: "asc" | "desc";
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

  const selectedToSort = searchParams.orderBy;
  const orderBy = selectedToSort
    ? { [selectedToSort]: searchParams.orderDirection || "asc" }
    : undefined; // to check if selectedSort is already on 'asc'

  const tickets = await prisma.ticket.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      status: status,
    },
    orderBy,
  });

  const ticketCount = await prisma.ticket.findMany({
    where: {
      status: status,
    },
  });

  const columns: { label: string; value: keyof Ticket }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
  ];

  return (
    <div className="space-y-3 p-3">
      <Flex direction="row" gap="2" justify="between">
        <FIlterStatus />
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={ticketCount.length}
        />
        <AddIssueBtn />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((header) => (
              <Table.ColumnHeaderCell key={header.value}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: header.value,
                      orderDirection:
                        searchParams.orderDirection === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {header.label}
                </NextLink>
                {header.value === searchParams.orderBy &&
                  (searchParams.orderDirection === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
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
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
