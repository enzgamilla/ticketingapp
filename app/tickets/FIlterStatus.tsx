"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const FIlterStatus = () => {
  const router = useRouter();

  const handleFilterStatus = (status: string) => {
    const query = status === "ALL" ? "" : `?status=${status}`;
    router.push(`/tickets${query}`);
  };

  return (
    <Select.Root onValueChange={(status) => handleFilterStatus(status)}>
      <Select.Trigger
        placeholder="Filter Status"
        className="hover:cursor-pointer"
      />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item
              key={status.value || "ALL"}
              value={status.value || "ALL"}
            >
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default FIlterStatus;
