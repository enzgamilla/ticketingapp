"use client";

import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueButton = ({ ticketId }: { ticketId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${ticketId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
      setDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" variant="solid" disabled={deleting}>
            <TrashIcon />
            {""}
            Delete Ticket{""}
            {deleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete this Ticket</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this ticket? This action is
            irreversible and the ticket will be permanently removed.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="start">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error Occured</AlertDialog.Title>
          <AlertDialog.Description size="2">
            An error has occurred, and the ticket could not be deleted at this
            time. Please try again later. If the issue persists, contact our
            support team for assistance.
            <br />
            <br />
            We apologize for any inconvenience this may have caused and
            appreciate your patience.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
                highContrast
              >
                Okay
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
