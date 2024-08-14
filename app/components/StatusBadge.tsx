import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: string;
}

const StatusBadge = ({ status }: Props) => {
  return (
    <Badge
      color={
        status === "OPEN" ? "red" : status === "IN_PROGRESS" ? "orange" : "jade"
      }
      variant="soft"
      radius="full"
    >
      {status === "OPEN"
        ? "Open"
        : status === "IN_PROGRESS"
        ? "In Progress"
        : "Closed"}
    </Badge>
  );
};

export default StatusBadge;
