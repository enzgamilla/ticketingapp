import prisma from "@/prisma/client";
import { Status, Ticket } from "@prisma/client";
import { Metadata } from "next";
import TableList from "../components/TableList";

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

  const pageProperties = {
    pageSize: pageSize,
    currentPage: page,
    itemCount: ticketCount.length,
  };

  const dataList: {
    id: string;
    colOne: string;
    colTwo: string;
    colThree: string;
  }[] =
    tickets?.map((ticket) => ({
      id: ticket.id.toString(),
      colOne: ticket.title,
      colTwo: ticket.status,
      colThree: ticket.createdAt.toDateString(),
    })) || [];

  return (
    <div className="space-y-3 p-3">
      <TableList
        pagination={pageProperties}
        dataList={dataList}
        headerList={columns}
        searchParams={searchParams}
        filter={true}
        labelAddBtn="Ticket"
        pathAddBtn="tickets"
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ticketing App - Ticket List",
  description: "View all tickets",
};

export default IssuesPage;
