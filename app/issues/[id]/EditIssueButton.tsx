import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ ticketId }: { ticketId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issue/${ticketId}/edit`}>Edit Ticket</Link>
    </Button>
  );
};

export default EditIssueButton;
