import { Button, TextArea, TextField } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" radius="large" />
      <TextArea variant="surface" placeholder="Descriptions...." />
      <Button>
        <Link href="/issues">Submit new Ticket</Link>
      </Button>
    </div>
  );
};

export default NewIssuePage;
