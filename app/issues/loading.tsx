import React from "react";
import { Skeleton, Table } from "@radix-ui/themes";
import AddIssueBtn from "./AddIssueBtn";

const TicketLoadingPage = () => {
  const loadinItem = [1, 2, 3, 4, 5];
  return (
    <>
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
          {loadinItem.map((ticket) => (
            <Table.Row key={ticket}>
              <Table.Cell className="font-bold">
                <Skeleton />
                <div className="block md:hidden">{<Skeleton />}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {<Skeleton />}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default TicketLoadingPage;
