import { Link } from "@/components/nav/AppLink";
import { NavLink } from "@/components/nav/NavLink";
import { User as IconUser } from "lucide-react";



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 flex-wrap">
        {/* TopBar */}
        <div className="w-full flex">
          {/* {authUser && (
            <div className="flex-1 flex items-center gap-5 justify-end  p-3">
              <div className="flex items-center">
                <IconUser />
                <Link href="/profile/logout">
                  {`${authUser.first_name} ${authUser.last_name}`}
                </Link>
              </div>

              <Link
                href="/profile/logout"
                className="text-blue-500 hover:underline"
              >
                Log out
              </Link>
            </div>
          )} */}
        </div>
        {children}
      </div>
    </div>
  );
}

const Sidebar = () => {
  return (
    <div className={` bg-black flex flex-col w-[300px]`}>
      <div className="p-4 text-white font-bold bg-teal-500">My App</div>
      <div className="flex-1 flex flex-col justify-center">
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/users"}>Users</NavLink>
        <NavLink href={"/about"}>About</NavLink>
        <NavLink href={"/profile"}>Profile</NavLink>
      </div>
    </div>
  );
};
