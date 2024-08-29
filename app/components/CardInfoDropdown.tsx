import { Box, Flex, Text, Avatar, DropdownMenu } from "@radix-ui/themes";
import { Cloudinary } from "@cloudinary/url-gen";
import React from "react";
import Link from "next/link";

interface CloudinaryProps {
  user_name: string;
  username: string;
  publicId: string;
}

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dges6v6ct",
  },
});

const CardInfoDropdown = ({
  user_name: user_Name,
  username,
  publicId,
}: CloudinaryProps) => {
  return (
    <Box className="hover:cursor-pointer">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex gap="2" align="center">
            <Avatar
              src={cloudinary.image(publicId).toURL()}
              fallback="?"
              size="3"
            />
            <Box className="select-none">
              <Text as="div" weight="bold" className="text-xs">
                {user_Name}
              </Text>
              <Text as="div" color="gray" className="text-xs">
                {username}
              </Text>
            </Box>
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="dropdown-content w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 absolute left-full top-0 mt-2 ml-2">
          <DropdownMenu.Item>
            <Link href="/account">Account Setting</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default CardInfoDropdown;
