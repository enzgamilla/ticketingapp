"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Card,
  Checkbox,
  Container,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const handleShowPass = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      console.log(result);
      setError(result.error);
      return;
    }
    router.replace("/");
    router.refresh();

    // if (res?.ok && res.status === 200) {
    //   router.push("/");
    //   router.refresh();
    // } else if (res?.error) {
    //   // router.push("/auth/error");
    //   router.push("/api/auth/error");
    //   console.log("An error occurred during sign-in:", res.error);
    // }
  };

  return (
    <>
      <Container size="1">
        <Flex direction="column">
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <Flex direction="column" gap="3" p="9" justify="center">
                <Text className="flex justify-center">Login</Text>
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
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Checkbox onCheckedChange={handleShowPass} />
                    Show Password
                  </Flex>
                </Text>
                <Flex
                  justify="center"
                  pt="2"
                  direction="column"
                  align="center"
                  gap="3"
                >
                  <Button>Login</Button>
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
