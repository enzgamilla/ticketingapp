"use client";

import { siteSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import {
  Card,
  Grid,
  Text,
  Flex,
  TextField,
  Button,
  Spinner,
} from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TicketFormData = z.infer<typeof siteSchema>;

const page = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(siteSchema),
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/sites", data);
      router.push("/sites");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An Unexpected Error Occured.");
    }
  });

  return (
    <Card m="9">
      <Form.Root className="flex justify-center" onSubmit={handleSubmitForm}>
        <Grid gap="2" p="9">
          <Text className="text-center text-xl pb-2">Create a site</Text>
          <Form.Field name="siteCode" className="grid mb-2  w-72">
            <Flex align="baseline" justify="between">
              <Form.Label className="text-xs">Site Code</Form.Label>
              <Form.Message
                match="valueMissing"
                className="text-xs text-red-500"
              >
                Please enter the site code.
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <TextField.Root type="text" {...register("siteCode")} required />
            </Form.Control>
          </Form.Field>
          <Form.Field name="siteName" className="grid mb-2 w-72">
            <Flex align="baseline" justify="between">
              <Form.Label className="text-xs">Site name</Form.Label>
              <Form.Message
                match="valueMissing"
                className="text-xs text-red-500"
              >
                Please enter the site name
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <TextField.Root type="text" {...register("siteName")} required />
            </Form.Control>
          </Form.Field>
          <Form.Field name="location" className="grid mb-2  w-72">
            <Flex align="baseline" justify="between">
              <Form.Label className="text-xs">Location</Form.Label>
              <Form.Message
                match="valueMissing"
                className="text-xs text-red-500"
              >
                Please enter the location.
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <TextField.Root type="text" {...register("location")} required />
            </Form.Control>
          </Form.Field>

          <Flex justify="center" pt="3" gap="2">
            <Button>
              <Link href="/sites">Back to Site list</Link>
            </Button>
            <Form.Submit asChild>
              <Button disabled={submitting}>
                {submitting ? "Creating site..." : "Create the site"}
                {submitting && <Spinner />}
              </Button>
            </Form.Submit>
          </Flex>
          {error && (
            <Text color="red" size="1" className="text-center">
              {error}
            </Text>
          )}
        </Grid>
      </Form.Root>
    </Card>
  );
};

export default page;
