"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import clsx from "clsx";
import type { AppRoute } from "../../lib/routes/routes"; // <- ici on importe les types

type NavLinkProps = {
  href: AppRoute;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};


export const NavLink = ({
  href,
  children,
  className = "",
  activeClassName = "text-black font-bold bg-white",
  inactiveClassName = "hover:bg-white/20 text-white",
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={clsx(
        "block p-4",
        className,
        isActive ? activeClassName : inactiveClassName
      )}
    >
      {children}
    </Link>
  );
};
