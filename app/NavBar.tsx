"use client";

import Link from "next/link";
import React from "react";
import classnames from "classnames";
import { SiPivotaltracker } from "react-icons/si";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathNames = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 p-5 items-center">
      <Link href="/">
        <SiPivotaltracker />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            className={classnames({
              "text-zinc-950": link.href === pathNames,
              "text-zinc-400": link.href !== pathNames,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
