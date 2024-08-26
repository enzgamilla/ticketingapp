import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status?: string;
  verified?: string;
}

const StatusBadge = ({ status, verified }: Props) => {
  return (
    <Badge
      color={
        status
          ? status === "OPEN"
            ? "red"
            : status === "IN_PROGRESS"
            ? "orange"
            : "jade"
          : verified === "Active"
          ? "jade"
          : "red"
      }
      variant="soft"
      radius="large"
    >
      {status
        ? status === "OPEN"
          ? "Open"
          : status === "IN_PROGRESS"
          ? "In Progress"
          : "Closed"
        : verified === "Active"
        ? "Active"
        : "Deactivated"}
    </Badge>
  );
};

export default StatusBadge;
