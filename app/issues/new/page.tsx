"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TicketForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<TicketForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <TextArea placeholder="Description.." {...register("description")} />
      <Button>Submit new Issue</Button>
    </form>
  );
};

export default NewIssuePage;
