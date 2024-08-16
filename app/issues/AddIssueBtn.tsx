import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const AddIssueBtn = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New Ticket</Link>
      </Button>
    </div>
  );
};

export default AddIssueBtn;
