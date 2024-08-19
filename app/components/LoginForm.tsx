"use client";

import {
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const handleShowPass = () => {
    if (!showPassword) setShowPassword(true);
    else setShowPassword(false);
  };

  const handleSubmitLF = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok && res.status === 200) {
      router.push("/");
      router.refresh();
    } else {
      console.log("User does not exsist");
    }

    console.log(res);
  });

  return (
    <Container size="1">
      <Flex direction="column">
        <Card>
          <form onSubmit={handleSubmitLF}>
            <Flex direction="column" gap="3" p="9" justify="center">
              <Text className="flex justify-center">Login</Text>
              <TextField.Root
                size="2"
                placeholder="Email"
                {...register("email")}
              />
              <TextField.Root
                placeholder="Password"
                size="2"
                type={showPassword === false ? "text" : "password"}
                {...register("password")}
              />
              <Text as="label" size="2">
                <Flex gap="2">
                  <Checkbox onCheckedChange={handleShowPass} />
                  Show Password
                </Flex>
              </Text>
              <Flex justify="center" pt="2">
                <Button>Login</Button>
              </Flex>
            </Flex>
          </form>
        </Card>
      </Flex>
    </Container>
  );
};

export default LoginForm;
