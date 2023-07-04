import { Outlet } from "@remix-run/react";
import { getUserFromSession, requireUserSession } from "~/data/auth.server";
import SideNav from "~/components/NavigationMenu";

export default function TicketsLayout() {
  return (
    <>
      {/* <MainHeader /> */}
      <SideNav />
      <Outlet />
    </>
  );
}

export async function loader({ request }) {
  const userId = await getUserFromSession(request);
  return userId;
}
