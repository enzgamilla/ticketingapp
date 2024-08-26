import { Box } from "@radix-ui/themes";
import { Restriction, User } from "@prisma/client";
import TableList from "../components/TableList";
import prisma from "@/prisma/client";

interface Props {
  searchParams: {
    page: string;
    orderBy: keyof User;
    orderDirection: "asc" | "desc";
  };
}

const UserPage = async ({ searchParams }: Props) => {
  const restrictions = Object.values(Restriction);

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const selectedToSort = searchParams.orderBy;
  const orderBy = selectedToSort
    ? { [selectedToSort]: searchParams.orderDirection || "asc" }
    : undefined; // to check if selectedSort is already on 'asc'

  const users = await prisma.user.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      name: { not: "" },
    },
    orderBy,
  });

  const userCount = await prisma.user.count();

  const columns: { label: string; value: keyof User }[] = [
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Position", value: "restrictions" },
    { label: "Active", value: "accountVerified" },
  ];

  const pagePropperties = {
    pageSize: pageSize,
    currentPage: page,
    itemCount: userCount,
  };

  const definePosition = (pos: Restriction) => {
    if (pos === "ADMIN") return "Admin";
    else if (pos === "IT_EMPLOYEE") return "IT Department";
    else return "Employee";
  };

  const defineVerified = (ver: boolean) => {
    return ver ? "Active" : "Deactivated";
  };

  const dataList: {
    id: string;
    colOne: string;
    colTwo: string;
    colThree: string;
    colFour: string;
  }[] =
    users.map((user) => ({
      id: user.id,
      colOne: user.name || "Empty",
      colTwo: user.email || "Empty",
      colThree: definePosition(user.restrictions),
      colFour: defineVerified(user.accountVerified),
    })) || [];

  return (
    <Box>
      <TableList
        dataList={dataList}
        headerList={columns}
        pagination={pagePropperties}
        searchParams={searchParams}
        labelAddBtn="User"
        pathAddBtn="users"
        filter={false}
      />
    </Box>
  );
};

export default UserPage;
