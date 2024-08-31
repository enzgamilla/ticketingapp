import { Box } from "@radix-ui/themes";
import React from "react";
import TableList from "../components/TableList";
import prisma from "@/prisma/client";
import { Site } from "@prisma/client";

interface Props {
  searchParams: {
    page: string;
    orderBy: keyof Site;
    orderDirection: "asc" | "desc";
  };
}

const SitePage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const selectedToSort = searchParams.orderBy;
  const orderBy = selectedToSort
    ? { [selectedToSort]: searchParams.orderDirection || "asc" }
    : undefined; // to check if selectedSort is already on 'asc'

  const sites = await prisma.site.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy,
  });

  const userCount = await prisma.site.count();

  const columns: { label: string; value: keyof Site }[] = [
    { label: "Code", value: "siteCode" },
    { label: "Office Name", value: "siteName" },
    { label: "Location", value: "location" },
    { label: "Status", value: "active" },
  ];

  const pagePropperties = {
    pageSize: pageSize,
    currentPage: page,
    itemCount: userCount,
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
    sites.map((site) => ({
      id: site.id,
      colOne: site.siteCode || "",
      colTwo: site.siteName || "",
      colThree: site.location || "",
      colFour: defineVerified(site.active),
    })) || [];

  return (
    <Box>
      <TableList
        dataList={dataList}
        headerList={columns}
        pagination={pagePropperties}
        searchParams={searchParams}
        labelAddBtn="Site"
        pathAddBtn="sites"
        filter={false}
      />
    </Box>
  );
};

export default SitePage;
