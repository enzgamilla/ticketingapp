"use client";
import { Ticket } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type UserType = {
  id: string;
  name: string;
};

const AssigneeSelectUser = ({ ticket }: { ticket: Ticket }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  const handleValueChange = (userId: string) => {
    const assignValue = userId === "none" ? null : userId;
    axios
      .patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: assignValue,
      })
      .catch(() => toast.error("Changes could not be saved."));
  };

  return (
    <>
      <Select.Root
        defaultValue={ticket.assignedToUserId || ""}
        onValueChange={(userId) => handleValueChange(userId)}
      >
        <Select.Trigger
          placeholder="Assign User"
          className="hover:cursor-pointer"
        />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="none">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<UserType[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelectUser;
