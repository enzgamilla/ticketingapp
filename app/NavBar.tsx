"use client";

import { Box, Card, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import UserDropdownAvatar from "./components/UserDropdownAvatar";

interface Props {
  name: string;
  email: string;
  public_id: string;
}

const NavBar = ({ name, email, public_id }: Props) => {
  const pathNames = usePathname();
  const isAuthPage =
    pathNames === "/auth/login" || pathNames === "/auth/singup"; // Adjust as needed
  if (isAuthPage) return null;
  return (
    <Card className="mb-5 bg-white">
      <Flex p="2" justify="between" align="center">
        <Text className="text-2xl font-semibold">Welcome {name}</Text>
        <Box className="space-x-3">
          <UserDropdownAvatar name={name} email={email} publicId={public_id} />
        </Box>
      </Flex>
    </Card>
  );
};

export default NavBar;
