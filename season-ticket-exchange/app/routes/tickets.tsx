import { Outlet } from "@remix-run/react";
// import { requireUserSession } from "~/data/auth.server";
import SideNav from "~/components/NavigationMenu";

export default function BrandsLayout() {
  return (
    <>
      {/* <MainHeader /> */}
      <SideNav />
      <Outlet />
    </>
  );
}

export async function loader({ request }) {
  //   const userId = await requireUserSession(request);
  //   return userId;
  return null;
}
