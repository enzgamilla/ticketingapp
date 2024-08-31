"use client";

import {
  Button,
  Card,
  Container,
  DropdownMenu,
  Flex,
  Grid,
  Link,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";

import { Site } from "@prisma/client";
import * as Form from "@radix-ui/react-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SiteInfoProps {
  site: Site;
}

type SiteInfo = {
  siteName: string;
  location: string;
};

const UpdateSiteForm = ({ site: siteProp }: SiteInfoProps) => {
  const { register, handleSubmit } = useForm<SiteInfo>();
  const route = useRouter();
  const [activate, setActivate] = useState(siteProp.active);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateInfo = async (data: SiteInfo) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/sites/${siteProp.id}`, {
        ...data,
        active: activate,
      });
      route.push("/sites");
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
                <Form.Label className="text-xs">Site Name</Form.Label>
                <Form.Message
                  match="valueMissing"
                  className="text-xs text-red-500"
                >
                  Please enter the site name
                </Form.Message>
              </Flex>
              <Form.Control asChild>
                <TextField.Root
                  type="text"
                  defaultValue={siteProp.siteName!}
                  {...register("siteName")}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="email" className="grid mb-2 w-72">
              <Flex align="baseline" justify="between">
                <Form.Label className="text-xs">Location</Form.Label>
                <Form.Message
                  match="valueMissing"
                  className="text-xs text-red-500"
                >
                  Please enter the location of the site
                </Form.Message>
              </Flex>
              <Form.Control asChild>
                <TextField.Root
                  type="text"
                  defaultValue={siteProp.location!}
                  {...register("location")}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Flex align="center" pb="4">
              <Text size="2" className="pr-3">
                Verify the site:
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

            <Flex justify="center" pt="3" gap="2">
              <Form.Submit asChild>
                <Button disabled={isLoading}>
                  {isLoading ? "Updating Site" : "Update Site"}
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

export default UpdateSiteForm;
