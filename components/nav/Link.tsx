"use client";

import NextLink from "next/link";
import type { LinkProps } from "next/link";
import type { ReactNode } from "react";
import type { AppLinkHref } from "@/lib/routes";
import { resolvePath } from "@/lib/resolvePath";

type AppLinkProps = Omit<LinkProps, "href"> & {
  href: AppLinkHref;
  children: ReactNode;
  className?: string;
};

export const Link = ({ href, children, ...rest }: AppLinkProps) => {
  const resolvedHref = resolvePath(href);

  return (
    <NextLink href={resolvedHref} {...rest}>
      {children}
    </NextLink>
  );
};
