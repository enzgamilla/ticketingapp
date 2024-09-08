"use client";

import { Spinner } from "@/app/components";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CloseTicketButton = ({ ticketId }: { ticketId: number }) => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClose = async () => {
    setLoading(true);
    await axios.patch("/api/tickets/" + ticketId, { status: "CLOSED" });
    route.push("/tickets");
  };

  return (
    <Button color="jade" onClick={handleClose} disabled={loading}>
      Mark as done
      {loading && <Spinner />}
    </Button>
  );
};

export default CloseTicketButton;
