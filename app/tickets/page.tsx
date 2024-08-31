import prisma from "@/prisma/client";
import { Status, Ticket } from "@prisma/client";
import { Metadata } from "next";
import TableList from "../components/TableList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";

interface Props {
  searchParams: {
    page: string;
    orderBy: keyof Ticket;
    orderDirection: "asc" | "desc";
    status: Status;
  };
}

const TicketPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);

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
    { label: "Created by", value: "assignedToUserId" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
  ];

  const pageProperties = {
    pageSize: pageSize,
    currentPage: page,
    itemCount: ticketCount.length,
  };

  const dataList = async (): Promise<
    {
      id: string;
      idUser: string;
      colOne?: string;
      colTwo?: string;
      colThree?: string;
      colFour?: string;
    }[]
  > => {
    if (!tickets) return [];

    const dataPromise = tickets.map(async (ticket) => {
      const userAccount = ticket.assignedToUserId
        ? await prisma.userAccount.findUnique({
            where: {
              id: ticket.assignedToUserId,
            },
            select: {
              id: true,
              name: true,
              assignedSiteCode: true,
            },
          })
        : null;

      return {
        id: ticket.id.toString(),
        idUser: userAccount?.id!,

        colOne: ticket.title,
        colTwo: `${userAccount?.name} - ${userAccount?.assignedSiteCode}` || "",
        colThree: "#" + ticket.status,
        colFour: ticket.createdAt.toDateString(),
      };
    });

    return Promise.all(dataPromise);
  };

  const dataListResult = await dataList();

  return (
    <div className="space-y-3 p-3">
      <TableList
        pagination={pageProperties}
        dataList={dataListResult}
        headerList={columns}
        searchParams={searchParams}
        filter={true}
        labelAddBtn="Ticket"
        pathAddBtn="tickets"
        currentSession={session?.user.id}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ticketing App - Ticket List",
  description: "View all tickets",
};

export default TicketPage;
