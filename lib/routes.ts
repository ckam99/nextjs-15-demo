// routes.ts
export const routes = {
  home: "/",
  dashboard: "/dashboard",
  settings: "/settings",
  profile: "/profile",
  profileLogout: "/profile/logout",
  users: "/users",
  about: "/about",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
