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
  Select,
  Skeleton,
} from "@radix-ui/themes";
import NextLink from "next/link";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { Restriction, UserAccount } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface UserInfoProps {
  user: UserAccount;
}

type UserInfo = {
  name: string;
  username: string;
};

type SiteInfo = {
  siteCode: string;
  siteName: string;
};

const UpdateUserForm = ({ user }: UserInfoProps) => {
  const { data: sites, isLoading } = useSites();

  const { register, handleSubmit } = useForm<UserInfo>();
  const route = useRouter();
  const [activate, setActivate] = useState(user.verification);
  const [location, setLocation] = useState(user.assignedSiteCode);
  const [restrictions, setRestriction] = useState(user.restrictions);
  const [submitting, setSubmitting] = useState(false);

  const handleUpdateInfo = async (data: UserInfo) => {
    try {
      setSubmitting(true);
      await axios.patch(`/api/users/${user.id}`, {
        ...data,
        verification: activate,
        assignedSiteCode: location,
        restrictions,
      });
      route.push("/users");
      route.refresh();
    } catch (error) {}
  };

  return (
    <Container size="1" pt="9">
      <Card>
        <Form.Root onSubmit={handleSubmit(handleUpdateInfo)}>
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
                  defaultValue={user.name!}
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
                  defaultValue={user?.username!}
                  {...register("username")}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Flex pb="4">
              <Text size="2" className="pr-3">
                Location:
              </Text>
              {isLoading ? (
                <Skeleton height="1rem" width="5rem" />
              ) : (
                <Select.Root
                  defaultValue={user.assignedSiteCode || ""}
                  onValueChange={(siteCode) => setLocation(siteCode)}
                >
                  <Select.Trigger
                    placeholder="Assign Location"
                    className="hover:cursor-pointer"
                    variant="ghost"
                  />
                  <Select.Content>
                    <Select.Group>
                      {sites?.map((site) => (
                        <Select.Item key={site.siteCode} value={site.siteCode}>
                          {site.siteCode} - {site.siteName}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              )}
            </Flex>
            <Flex pb="4">
              <Text size="2" className="pr-3">
                Position:
              </Text>
              {isLoading ? (
                <Skeleton height="1rem" width="5rem" />
              ) : (
                <Select.Root
                  defaultValue={restrictions}
                  onValueChange={(restriction: Restriction) =>
                    setRestriction(restriction)
                  }
                >
                  <Select.Trigger
                    placeholder="Assign Position"
                    className="hover:cursor-pointer"
                    variant="ghost"
                  />
                  <Select.Content>
                    <Select.Item value="ADMIN">Admin</Select.Item>
                    <Select.Item value="EMPLOYEE">Employee</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            </Flex>
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
              <Link className="hover:cursor-pointer hover:underline">
                Click here.
              </Link>{" "}
              To Change user password
            </Text>
            <Flex justify="center" pt="3" gap="2">
              <Button>
                <NextLink href="/users">Back to User list</NextLink>
              </Button>
              <Form.Submit asChild>
                <Button disabled={submitting}>
                  {submitting ? "Updating User" : "Update User"}
                  {submitting && <Spinner />}
                </Button>
              </Form.Submit>
            </Flex>
          </Grid>
        </Form.Root>
      </Card>
    </Container>
  );
};

const useSites = () =>
  useQuery<SiteInfo[]>({
    queryKey: ["sites"],
    queryFn: () => axios.get("/api/sites").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default UpdateUserForm;
