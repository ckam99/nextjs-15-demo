import { logoutAction } from "@/features/auth/actions/auth";

export  default async function Page() {

  await logoutAction()
 
  return (
    <div>Loging out...</div>
  );
}
