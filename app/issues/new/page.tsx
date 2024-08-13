"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketSchema } from "@/app/validationSchema";
import { z } from "zod";

type TicketForm = z.infer<typeof createTicketSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketForm>({
    resolver: zodResolver(createTicketSchema),
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5" size="1">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An Unexpected Error Occured.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} size="2" />
        {errors.title && (
          <Text color="red" as="p" size="1">
            {errors.title.message}
          </Text>
        )}
        <TextArea
          placeholder="Description.."
          {...register("description")}
          size="3"
        />
        {errors.description && (
          <Text color="red" as="p" size="1">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit new Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
