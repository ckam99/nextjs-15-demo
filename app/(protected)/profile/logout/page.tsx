import { logoutAction } from "@/features/auth/actions/logout";

export  default async function Page() {

  await logoutAction()
 
  return (
    <div>Loging out...</div>
  );
}
