import { Box, Flex, Text, Avatar, DropdownMenu } from "@radix-ui/themes";
import { Cloudinary } from "@cloudinary/url-gen";
import React from "react";
import Link from "next/link";

interface Props {
  userName: string;
  userEmail: string;
  publicId: string;
}

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dges6v6ct",
  },
});

const isGoogleImage = (url: string): boolean => {
  return url.includes("googleusercontent.com");
};

const CardInfoDropdown = ({ userName, userEmail, publicId }: Props) => {
  return (
    <Box className="hover:cursor-pointer">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex gap="2" align="center">
            {isGoogleImage(publicId) ? (
              <Avatar src={publicId} fallback="?" size="3" />
            ) : (
              <Avatar
                src={cloudinary.image(publicId).toURL()}
                fallback="?"
                size="3"
              />
            )}
            <Box className="select-none">
              <Text as="div" weight="bold" className="text-xs">
                {userName}
              </Text>
              <Text as="div" color="gray" className="text-xs">
                {userEmail}
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
