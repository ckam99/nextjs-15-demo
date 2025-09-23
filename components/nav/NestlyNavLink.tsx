"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import clsx from "clsx";
import type { AppRoute } from "../../lib/routes";

type NestlyNavLinkProps = {
  href: AppRoute;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};

export const NestlyNavLink = ({
  href,
  children,
  className = "",
  activeClassName = "text-teal-400 font-bold",
  inactiveClassName = "hover:text-teal-600 text-black",
}: NestlyNavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={clsx(
        "p-1",
        className,
        isActive ? activeClassName : inactiveClassName
      )}
    >
      {children}
    </Link>
  );
};
