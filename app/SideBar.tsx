"use client";

import Link from "next/link";
import React from "react";
import { SiPivotaltracker } from "react-icons/si";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  ListBulletIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

const SideBar = () => {
  const pathNames = usePathname();
  const isAuthPage =
    pathNames === "/auth/login" || pathNames === "/auth/singup"; // Adjust as needed
  if (isAuthPage) return null;
  const links = [
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
  ];
  return (
    <aside className="flex flex-col w-60 px-5 border-r min-h-screen bg-white">
      <Flex justify="between">
        <Link href="/">
          <SiPivotaltracker className="size-10" />
        </Link>
      </Flex>
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
    </aside>
  );
};

export default SideBar;
