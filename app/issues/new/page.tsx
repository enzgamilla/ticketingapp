"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Link from "next/link";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" radius="large" />
      <SimpleMDE placeholder="Descriptions...." />
      <Button>
        <Link href="/issues">Submit new Ticket</Link>
      </Button>
    </div>
  );
};

export default NewIssuePage;
