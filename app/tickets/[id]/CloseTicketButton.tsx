"use client";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const CloseTicketButton = ({ ticketId }: { ticketId: number }) => {
  const route = useRouter();
  const handleClose = async () => {
    await axios.patch("/api/tickets/" + ticketId, { status: "CLOSED" });
    route.push("/tickets");
  };

  return (
    <Button color="jade" onClick={handleClose}>
      <CheckCircledIcon />
      Mark as done
    </Button>
  );
};

export default CloseTicketButton;
