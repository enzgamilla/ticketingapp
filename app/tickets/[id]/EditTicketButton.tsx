import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditTicketButton = ({ ticketId }: { ticketId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/tickets/${ticketId}/edit`}>Edit Ticket</Link>
    </Button>
  );
};

export default EditTicketButton;
