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
  email: string;
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
      email: data.email,
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
          <Card className="shadow-2xl bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <Flex direction="column" gap="3" p="9" justify="center">
                <Text className="flex justify-center">Track Our Tickets</Text>
                <TextField.Root
                  size="2"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <Text color="red" size="2">
                    {errors.email.message}
                  </Text>
                )}
                <TextField.Root
                  placeholder="Password"
                  size="2"
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
                <Flex direction="row" justify="between" align="center">
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <Checkbox onCheckedChange={handleShowPass} />
                      Show Password
                    </Flex>
                  </Text>
                  <Link href="/auth/singup" className="text-xs text-cyan-600">
                    Don't have an account?{" "}
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
                    <Text color="red" size="2">
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
