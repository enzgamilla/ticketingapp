import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  path: string;
}

const AddIssueBtn = ({ label, path }: Props) => {
  return (
    <div>
      <Button>
        <Link href={`/${path}/new`}>New {label}</Link>
      </Button>
    </div>
  );
};

export default AddIssueBtn;
