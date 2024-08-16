import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  name: string;
}

const NavBar = ({ name }: Props) => {
  return (
    <Card className="mb-5 bg-white">
      <Flex p="2" justify="between" align="center">
        <Text className="text-2xl font-semibold">Welcome {name}</Text>
        <Link href="/api/auth/signout" className="font-semibold text-xl">
          Sign Out
        </Link>
      </Flex>
    </Card>
  );
};

export default NavBar;
