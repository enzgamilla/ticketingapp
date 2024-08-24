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

const isGoogleImage = (url: string): boolean => {
  return url.includes("googleusercontent.com");
};

const UserDropdownAvatar = ({ email, publicId }: CloudinaryProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {isGoogleImage(publicId) ? (
          <Avatar
            src={publicId}
            fallback="?"
            size="2"
            className="cursor-pointer"
          />
        ) : (
          <Avatar
            src={cloudinary.image(publicId).toURL()}
            fallback="?"
            size="2"
            className="cursor-pointer"
          />
        )}
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
