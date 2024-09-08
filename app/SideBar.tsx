"use client";

import Link from "next/link";
import React from "react";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  ListBulletIcon,
  PersonIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import { Box, Separator } from "@radix-ui/themes";
import CardInfoDropdown from "./components/CardInfoDropdown";
import { Restriction } from "@prisma/client";

interface Props {
  name: string;
  username: string;
  publicId: string;
  role: Restriction;
}

const SideBar = ({ username, name, publicId, role }: Props) => {
  const pathNames = usePathname();
  const isAuthPage =
    pathNames === "/auth/login" || pathNames === "/auth/singup"; // Adjust as needed
  if (isAuthPage) return null;
  const links =
    role === "ADMIN"
      ? [
          {
            icon: <DashboardIcon className="size-5" />,
            label: "Dashboard",
            href: "/",
          },
          {
            icon: <ListBulletIcon className="size-5" />,
            label: "Tickets",
            href: "/tickets",
          },
          {
            icon: <PersonIcon className="size-5" />,
            label: "Users",
            href: "/users",
          },
          {
            icon: <SewingPinIcon className="size-5" />,
            label: "Sites",
            href: "/sites",
          },
        ]
      : [
          {
            icon: <DashboardIcon className="size-5" />,
            label: "Dashboard",
            href: "/",
          },
          {
            icon: <ListBulletIcon className="size-5" />,
            label: "Tickets",
            href: "/tickets",
          },
        ];

  return (
    <aside className="flex flex-col border-r bg-white">
      <Box py="5" pl="3">
        <CardInfoDropdown
          user_name={name}
          username={username}
          publicId={publicId}
        />
      </Box>
      <Separator size="4" />
      <Box px="5">
        <ul className="pt-10 space-y-10">
          {links.map((link) => (
            <Link
              className={`${classnames({
                "text-zinc-950":
                  pathNames === link.href ||
                  pathNames.startsWith(`${link.href}/`),
                "text-zinc-400":
                  pathNames !== link.href &&
                  !pathNames.startsWith(`${link.href}/`),
                "hover:text-zinc-800 transition-colors": true,
              })} flex items-center`}
              href={link.href}
              key={link.href}
            >
              {link.icon}&nbsp;{link.label}
            </Link>
          ))}
        </ul>
      </Box>
    </aside>
  );
};

export default SideBar;
