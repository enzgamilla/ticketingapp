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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserAccount } from "@prisma/client";

interface Props {
  id: string;
}

const SideBar = ({ id }: Props) => {
  const { data: users } = useQuery<UserAccount>({
    queryKey: ["users", id],
    queryFn: () =>
      axios.get("/api/users/sessionUser/" + id).then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const pathNames = usePathname();
  const isAuthPage =
    pathNames === "/auth/login" || pathNames === "/auth/singup"; // Adjust as needed
  if (isAuthPage) return null;
  const links =
    users?.restrictions === "ADMIN"
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
          user_name={users?.name!}
          username={users?.username!}
          publicId={users?.image! || "default_profile_vtwkjs"}
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
