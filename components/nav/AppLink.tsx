import type { LinkProps } from "next/link";
import type { AppRoute } from "@/lib/routes";
import type { ReactNode } from "react";
import NextLink from "next/link";

// Même props que Link, sauf href est typé
type AppLinkProps = Omit<LinkProps, "href"> & {
  href: AppRoute;
  children: ReactNode;
  className?: string;
};

export const Link = ({ href, children, ...rest }: AppLinkProps) => {
  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  );
};
