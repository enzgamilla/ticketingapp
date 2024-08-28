"use client";

import {
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const handleShowPass = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: "@" + data.username,
      password: data.password,
    });

    if (result?.error) {
      console.log(result);
      setSubmitting(false);
      setError(result.error);
      return;
    }
    router.replace("/");
    router.refresh();
  };

  return (
    <>
      <Container size="1">
        <Flex direction="column" height="100vh" pt="9">
          <Card className="shadow-2xl bg-white h-96">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-center"
            >
              <Flex
                direction="column"
                gap="3"
                p="9"
                justify="center"
                width="30rem"
                align="center"
              >
                <Text className="flex justify-center">Track Our Tickets</Text>
                <TextField.Root
                  className="w-72"
                  size="3"
                  placeholder="Username"
                  {...register("username")}
                >
                  <TextField.Slot>@</TextField.Slot>
                </TextField.Root>
                {errors.username && (
                  <Text color="red" size="2">
                    {errors.username.message}
                  </Text>
                )}
                <TextField.Root
                  className="w-72"
                  placeholder="Password"
                  size="3"
                  type={showPassword === false ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <Text color="red" size="2">
                    {errors.password.message}
                  </Text>
                )}
                <Flex direction="row" justify="between" align="center" gap="3">
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <Checkbox onCheckedChange={handleShowPass} />
                      Show Password
                    </Flex>
                  </Text>
                  <Link href="/auth/singup" className="text-xs text-cyan-600">
                    Don&apos;t have an account?{" "}
                  </Link>
                </Flex>

                <Flex
                  justify="center"
                  pt="2"
                  direction="column"
                  align="center"
                  gap="3"
                >
                  <Button disabled={submitting}>
                    Login
                    {submitting && <Spinner />}
                  </Button>
                  {error && (
                    <Text color="red" size="1">
                      {error}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </form>
          </Card>
        </Flex>
      </Container>
    </>
  );
};

export default LoginForm;
