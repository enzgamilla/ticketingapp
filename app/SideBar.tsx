"use client";

import Link from "next/link";
import React from "react";
import { SiPivotaltracker } from "react-icons/si";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { DashboardIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

const SideBar = () => {
  const pathNames = usePathname();
  const links = [
    {
      icon: <DashboardIcon className="size-5" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <ListBulletIcon className="size-5" />,
      label: "Tickets",
      href: "/issues",
    },
  ];
  return (
    <aside className="w-64 border-r min-h-screen bg-white">
      <Flex py="5" justify="center">
        <Link href="/">
          <SiPivotaltracker className="size-10" />
        </Link>
      </Flex>
      <Flex pl="3" align="center">
        <ul className="space-y-6">
          {links.map((link) => (
            <Link
              className={`${classnames({
                "text-zinc-950": link.href === pathNames,
                "text-zinc-400": link.href !== pathNames,
                "hover:text-zinc-800 transition-colors": true,
              })} flex items-center`}
              href={link.href}
              key={link.href}
            >
              {link.icon}&nbsp;{link.label}
            </Link>
          ))}
        </ul>
      </Flex>
    </aside>
  );
};

export default SideBar;
