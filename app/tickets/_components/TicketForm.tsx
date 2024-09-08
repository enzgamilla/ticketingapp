"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { ticketSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type TicketFormData = z.infer<typeof ticketSchema>;

const TicketForm = ({
  ticket,
  userId,
  assignedSite,
}: {
  ticket?: Ticket;
  userId?: string;
  assignedSite?: string;
}) => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      if (ticket) await axios.patch("/api/tickets/" + ticket.id, data);
      else
        await axios.post("/api/tickets", {
          ...data,
          assignedToUserId: userId,
          siteCode: assignedSite,
        });
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An Unexpected Error Occured.");
    }
  });

  return (
    <div className="flex justify-center pt-7">
      <div className="w-[50rem]">
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
            {ticket ? "Update Ticket " : "Submit new Ticket "}
            {submitting && <Spinner />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
