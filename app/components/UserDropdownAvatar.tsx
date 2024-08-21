import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { Cloudinary } from "@cloudinary/url-gen";
import Link from "next/link";

interface CloudinaryProps {
  name: string;
  email: string;
  publicId: string;
}

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dges6v6ct",
  },
});

const UserDropdownAvatar = ({ name, email, publicId }: CloudinaryProps) => {
  const scrUrl = cloudinary.image(publicId);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={scrUrl.toURL()}
          fallback="?"
          size="2"
          className="cursor-pointer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2">{email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout"> Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserDropdownAvatar;
