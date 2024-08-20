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
import * as Form from "@radix-ui/react-form";

type SingupFormValues = {
  email: string;
  password: string;
};

const SingupForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingupFormValues>();

  const handleShowPass = () => setShowPassword(!showPassword);

  const onSubmit = async (data: SingupFormValues) => {};

  return (
    <Container>
      <Form.Root className="w-[250px]"></Form.Root>
    </Container>
  );
};

export default SingupForm;
