"use client";

import NextLink from "next/link";
import type { LinkProps } from "next/link";
import type { ReactNode } from "react";
import { resolvePath } from "@/lib/resolvePath";
import type { AppLinkHref } from "@/lib/routes/routes";

type AppLinkProps = Omit<LinkProps, "href"> & {
  href: AppLinkHref;
  children: ReactNode;
  className?: string;
};

export const AppLink = ({ href, children, ...rest }: AppLinkProps) => {
  const resolvedHref = resolvePath(href);

  return (
    <NextLink href={resolvedHref} {...rest}>
      {children}
    </NextLink>
  );
};
