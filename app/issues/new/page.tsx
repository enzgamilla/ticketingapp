"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type TicketForm = z.infer<typeof createTicketSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketForm>({
    resolver: zodResolver(createTicketSchema),
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An Unexpected Error Occured.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5" size="1">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmitForm}>
        <TextField.Root placeholder="Title" {...register("title")} size="2" />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextArea
          placeholder="Description.."
          {...register("description")}
          size="3"
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={submitting}>
          Submit new Issue {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
