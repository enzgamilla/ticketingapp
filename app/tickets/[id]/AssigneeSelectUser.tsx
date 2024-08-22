"use client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

type UserType = {
  id: string;
  name: string;
};

const AssigneeSelectUser = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get<UserType[]>("/api/users");
      setUsers(data);
    };

    getUser();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger
        placeholder="Assign User"
        className="hover:cursor-pointer"
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelectUser;
