// resolvePath.ts
import type { AppLinkHref } from "./routes/routes";

export function resolvePath(href: AppLinkHref): string {
  if (typeof href === "string") return href;

  let path: string = href.to;
  const params = href.params;

  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`$${key}`, encodeURIComponent(String(value)));
  }

  return path;
}