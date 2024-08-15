"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketSchema } from "@/app/validationSchema";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Ticket } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type TicketFormData = z.infer<typeof createTicketSchema>;

const TicketForm = ({ ticket }: { ticket?: Ticket }) => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TicketFormData>({
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
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          size="2"
          defaultValue={ticket?.title}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={ticket?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description.." {...field} ref={null} />
          )}
        ></Controller>

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={submitting}>
          {!ticket ? "Submit new Ticket" : "Update Ticket"}
          {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TicketForm;
