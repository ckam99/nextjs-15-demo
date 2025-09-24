// routes.ts
export const routes = {
  home: "/",
  dashboard: "/dashboard",
  settings: "/settings",
  profile: "/profile",
  profileLogout: "/profile/logout",
  users: "/users",
  login: "/auth/sign-in",
  about: "/about",
  userDetails: "/users/$userId",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];


/**
 * Type des routes dynamiques avec leurs params
 */
type RoutesWithParams = {
  "/users/$userId": { userId: string | number };
};

/**
 * Type accepté par AppLink:
 * - string route (statique ou dynamique)
 * - ou { to, params }
 */
export type AppLinkHref =
  | AppRoute
  | {
      [K in keyof RoutesWithParams]: {
        to: K;
        params: RoutesWithParams[K];
      };
    }[keyof RoutesWithParams];
