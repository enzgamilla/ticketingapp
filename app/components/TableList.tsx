import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Dialog, Flex, Table, Link } from "@radix-ui/themes";
import AddIssueBtn from "../tickets/AddIssueBtn";
import FIlterStatus from "../tickets/FIlterStatus";
import NextLink from "next/link";
import Pagination from "./Pagination";
import StatusBadge from "./StatusBadge";
import { Ticket, UserAccount } from "@prisma/client";
import prisma from "@/prisma/client";
import {
  checkAt,
  checkHashtag,
  isValidDateString,
  removeAt,
  removeHashtag,
} from "./StringFunctions";

interface Props {
  headerList: { label: string; value: string }[];
  dataList: {
    id: string;
    idUser?: string;
    colOne?: string;
    colTwo?: string;
    colThree?: string;
    colFour?: string;
  }[];
  pagination: {
    pageSize: number;
    currentPage: number;
    itemCount: number;
  };
  searchParams: {
    orderBy: keyof Ticket | keyof UserAccount;
    orderDirection: "asc" | "desc";
  };
  labelAddBtn: string;
  pathAddBtn: string;
  filter?: boolean;
  currentSession?: string;
}

const TableList = async ({
  headerList,
  dataList,
  pagination,
  searchParams,
  labelAddBtn,
  pathAddBtn,
  filter,
  currentSession,
}: Props) => {
  const currentLogged = await (async (): Promise<{ restriction: string }> => {
    if (currentSession) {
      const user = await prisma.userAccount.findUnique({
        where: { id: currentSession },
        select: { restrictions: true },
      });

      if (user && user.restrictions) {
        return { restriction: user.restrictions };
      }
    }

    return { restriction: "" };
  })();

  return (
    <div className="space-y-3 p-3">
      <Flex direction="row" gap="2" justify="between">
        {filter && <FIlterStatus />}
        <Pagination
          pageSize={pagination.pageSize}
          currentPage={pagination.currentPage}
          itemCount={pagination.itemCount}
        />
        <AddIssueBtn label={labelAddBtn} path={pathAddBtn} />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {headerList.map((header) => (
              <Table.ColumnHeaderCell key={header.value}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: header.value,
                      orderDirection:
                        searchParams?.orderDirection === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {header.label}
                </NextLink>
                {header.value === searchParams?.orderBy &&
                  (searchParams!.orderDirection === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataList.map((data) => (
            <Table.Row key={data.id}>
              <Table.Cell>
                {currentSession ? (
                  currentLogged.restriction === "ADMIN" ? (
                    <Link
                      href={`/${pathAddBtn}/${data.id}`}
                      className="hover:cursor-pointer hover:underline"
                    >
                      {data.colOne}
                    </Link>
                  ) : data.idUser !== currentSession ? (
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Link className="hover:cursor-pointer hover:underline">
                          {data.colOne}
                        </Link>
                      </Dialog.Trigger>

                      <Dialog.Content maxWidth="450px">
                        <Dialog.Title>Notice:</Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                          Only the creator of this ticket has the ability to
                          make edits
                        </Dialog.Description>
                      </Dialog.Content>
                    </Dialog.Root>
                  ) : (
                    <Link
                      href={`/${pathAddBtn}/${data.id}`}
                      className="hover:cursor-pointer hover:underline"
                    >
                      {data.colOne}
                    </Link>
                  )
                ) : (
                  <Link
                    href={`/${pathAddBtn}/${data.id}`}
                    className="hover:cursor-pointer hover:underline"
                  >
                    {data.colOne}
                  </Link>
                )}
              </Table.Cell>
              <Table.Cell>
                {checkAt(data.colTwo!) ? removeAt(data.colTwo!) : data.colTwo}
              </Table.Cell>
              <Table.Cell>
                {checkHashtag(data.colThree!) ? (
                  <StatusBadge status={removeHashtag(data.colThree!)} />
                ) : (
                  removeHashtag(data.colThree!)
                )}
              </Table.Cell>
              {isValidDateString(data.colFour!) ? (
                <Table.Cell>{data.colFour}</Table.Cell>
              ) : (
                <Table.Cell>
                  <StatusBadge verified={data.colFour} />
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TableList;
