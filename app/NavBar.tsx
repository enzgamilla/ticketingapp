import { Card, Text } from "@radix-ui/themes";
import React from "react";

const NavBar = () => {
  return (
    <Card className="flex space-x-6 border-b mb-5 p-5 justify-between bg-white">
      <Text className="text-2xl font-semibold">Welcome User</Text>
    </Card>
  );
};

export default NavBar;
