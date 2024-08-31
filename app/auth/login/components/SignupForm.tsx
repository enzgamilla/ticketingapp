"use client";

import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Grid,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import axios from "axios";

type SingupFormValues = {
  name: string;
  username: string;
  password: string;
  cpassword: string;
};

const SingupForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, handleSubmit } = useForm<SingupFormValues>();

  const handleShowPass = () => setShowPassword(!showPassword);

  const onSubmit = async (data: SingupFormValues) => {
    if (data.password === data.cpassword) {
      setError("");
      const setUname = { ...data, username: "@" + data.username };
      await axios.post("/api/register", setUname);
      router.push("/auth/login");
    } else {
      setError("Your password does not match");
    }
  };

  return (
    <>
      <Container size="2" pt="9">
        <Card>
          <Form.Root
            className="flex justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid gap="2" p="9">
              <Text className="text-center text-xl pb-2">
                Register your account
              </Text>
              <Form.Field name="name" className="grid mb-2  w-72">
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
                  <TextField.Root type="text" required {...register("name")} />
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
                    required
                    {...register("username")}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name="password" className="grid mb-2  w-72">
                <Flex align="baseline" justify="between">
                  <Form.Label className="text-xs">Password</Form.Label>
                  <Form.Message
                    match="valueMissing"
                    className="text-xs text-red-500"
                  >
                    Please enter your password.
                  </Form.Message>
                </Flex>
                <Form.Control asChild>
                  <TextField.Root
                    required
                    type={showPassword === false ? "text" : "password"}
                    {...register("password")}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name="cpassword" className="grid mb-2 w-72">
                <Flex align="baseline" justify="between">
                  <Form.Label className="text-xs">Confirm Password</Form.Label>
                  <Form.Message
                    match="valueMissing"
                    className="text-xs text-red-500"
                  >
                    Please enter your password.
                  </Form.Message>
                </Flex>
                <Form.Control asChild>
                  <TextField.Root
                    required
                    type={showPassword === false ? "text" : "password"}
                    {...register("cpassword")}
                  />
                </Form.Control>
                <Text as="label" size="2" className="pt-3">
                  <Flex gap="2">
                    <Checkbox onCheckedChange={handleShowPass} />
                    Show Password
                  </Flex>
                </Text>
              </Form.Field>
              <Flex justify="center" pt="3" gap="2">
                <Button>
                  <Link href="/auth/login">Back to Login</Link>
                </Button>
                <Form.Submit asChild>
                  <Button disabled={submitting}>
                    Sign up
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
      </Container>
    </>
  );
};

export default SingupForm;
