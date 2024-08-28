"use client";

import {
  Card,
  Grid,
  Flex,
  TextField,
  Button,
  Container,
  Text,
  DropdownMenu,
  Link,
  Spinner,
} from "@radix-ui/themes";

import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserInfoProps {
  user: User;
}

type UserInfo = {
  name: string;
  email: string;
};

const UpdateUserForm = ({ user }: UserInfoProps) => {
  const { register, handleSubmit } = useForm<UserInfo>();
  const route = useRouter();
  const [activate, setActivate] = useState(user.verification);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateInfo = async (data: UserInfo) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/users/${user.id}`, {
        ...data,
        verification: activate,
      });
      route.push("/users");
      route.refresh();
    } catch (error) {}
  };

  return (
    <Container size="2" pt="9">
      <Card>
        <Form.Root
          className="flex justify-center"
          onSubmit={handleSubmit(handleUpdateInfo)}
        >
          <Grid gap="2" p="9">
            <Form.Field name="name" className="grid mb-2 w-72">
              <Flex align="baseline" justify="between">
                <Form.Label className="text-xs">Full name</Form.Label>
                <Form.Message
                  match="valueMissing"
                  className="text-xs text-red-500"
                >
                  Please enter your name
                </Form.Message>
              </Flex>
              <Form.Control asChild>
                <TextField.Root
                  type="text"
                  value={user?.name!}
                  {...register("name")}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="email" className="grid mb-2 w-72">
              <Flex align="baseline" justify="between">
                <Form.Label className="text-xs">Username</Form.Label>
                <Form.Message
                  match="valueMissing"
                  className="text-xs text-red-500"
                >
                  Please enter your username
                </Form.Message>
              </Flex>
              <Form.Control asChild>
                <TextField.Root
                  type="text"
                  value={user?.username!}
                  {...register("email")}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Flex align="center" pb="4">
              <Text size="2" className="pr-3">
                Account Verification:
              </Text>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="soft" color={activate ? "jade" : "red"}>
                    {activate ? "Activated" : "Deactivated"}
                    <DropdownMenu.TriggerIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item
                    color="jade"
                    onSelect={() => setActivate(true)}
                  >
                    Activate
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    color="red"
                    onSelect={() => setActivate(false)}
                  >
                    Deactivate
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
            <Text as="label" size="2">
              <Link href="">Click here.</Link> To Change user password
            </Text>
            <Flex justify="center" pt="3" gap="2">
              <Form.Submit asChild>
                <Button disabled={isLoading}>
                  {isLoading ? "Updating User" : "Update User"}
                  {isLoading && <Spinner />}
                </Button>
              </Form.Submit>
            </Flex>
          </Grid>
        </Form.Root>
      </Card>
    </Container>
  );
};

export default UpdateUserForm;
