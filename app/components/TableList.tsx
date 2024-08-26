import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import AddIssueBtn from "../tickets/AddIssueBtn";
import FIlterStatus from "../tickets/FIlterStatus";
import NextLink from "next/link";
import CustomLink from "./CustomLink";
import Pagination from "./Pagination";
import StatusBadge from "./StatusBadge";
import { Status, Ticket, User } from "@prisma/client";

interface Props {
  headerList: { label: string; value: string }[];
  dataList: {
    id: string;
    colOne: string;
    colTwo: string;
    colThree: string;
    colFour?: string;
  }[];
  pagination: {
    pageSize: number;
    currentPage: number;
    itemCount: number;
  };
  searchParams: {
    orderBy: keyof Ticket | keyof User;
    orderDirection: "asc" | "desc";
  };
  labelAddBtn: string;
  pathAddBtn: string;
  filter?: boolean;
}

const TableList = ({
  headerList,
  dataList,
  pagination,
  searchParams,
  labelAddBtn,
  pathAddBtn,
  filter,
}: Props) => {
  const checkColtwo = (colTwo: string): boolean => {
    return colTwo.includes("@");
  };

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
                <CustomLink href={`/${pathAddBtn}/${data.id}`}>
                  {data.colOne}
                </CustomLink>
              </Table.Cell>
              <Table.Cell>
                {checkColtwo(data.colTwo) ? (
                  data.colTwo
                ) : (
                  <StatusBadge status={data.colTwo} />
                )}
              </Table.Cell>
              <Table.Cell>{data.colThree}</Table.Cell>
              {data.colFour && (
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
