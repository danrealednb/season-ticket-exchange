import { Outlet } from "@remix-run/react";
import {
  getUserFromSession,
  getUserProfile,
  requireUserSession,
} from "~/data/auth.server";
import SideNav from "~/components/NavigationMenu";
import AdminNav from "~/components/AdminMenu";

export default function TicketsLayout() {
  return (
    <>
      {/* <MainHeader /> */}
      <SideNav />
      <Outlet />
    </>
  );
}

// export async function loader({ request }) {
//   const userId = await getUserFromSession(request);
//   if (!userId) {
//     console.log("Couldnt find user id");
//   } else {
//     console.log(`Found user id ${userId}`);
//   }
//   const userData = await getUserProfile(userId);
//   console.log(userData);
//   return userData;

//   //   const userId = await requireUserSession(request);
//   //   if (!userId) {
//   //     redirect("/auth?mode=login");
//   //   }
//   //   return userId;
// }
