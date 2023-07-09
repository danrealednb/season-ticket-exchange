import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import {
  getUnVerifiedUsers,
  getUserFromSession,
  getUserProfile,
  requireUserSession,
  verifySellerVerified,
} from "~/data/auth.server";

import AdminList from "~/components/admin/AdminList";

export default function AdminPage() {
  const { userData, unVerifiedUsers } = useLoaderData();
  //   console.log("USER DATA FROM INDEX PAGE", userData);
  const isAdminUser = userData.role === "ADMIN";
  const hasUsers = unVerifiedUsers && unVerifiedUsers.length > 0;
  //   console.log("has users", hasUsers);
  //   console.log("UnVerified USers", unVerifiedUsers);

  return (
    <>
      <main className="">
        <h1 className="text-white text-center text-4xl underline py-2">
          Administration
        </h1>
        {!isAdminUser && (
          <p className="text-white text-center">
            Sorry. This is a restricted page to Admins Only.
          </p>
        )}
        {isAdminUser && (
          <div className="text-white text-center">
            {hasUsers && <AdminList users={unVerifiedUsers} />}
          </div>
        )}
      </main>
    </>
  );
}

export async function loader({ request }) {
  const userId = requireUserSession(request);
  //   const userId = await getUserFromSession(request);
  if (!userId) {
    return redirect("/auth?mode=login");
  }
  const userData = await getUserProfile(userId);
  //   console.log(userData.role);
  //   if (userData?.role !== "ADMIN") {
  //     return redirect("/");
  //   }

  const unVerifiedUsers = await getUnVerifiedUsers();
  //   console.log("Unverifed users from index loader", unVerifiedUsers);
  return { userData, unVerifiedUsers };
}

export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  const userId = formData.get("userId");
  //   console.log("USER DATA FROM ACTION", userData);
  //   console.log("User id from action", userId);
  await verifySellerVerified(userId);
  return redirect("/admin");
}

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const search = new URLSearchParams(url.search);
//   const query = search.get("query") || null;
//   if (!query) {
//     const tickets = await getAvailableTickets();
//     return tickets;
//   } else {
//     const gameId = parseInt(query);
//     const tickets = await getAvailableTicketsSearch(gameId);
//     return tickets;
//   }
// }

// export async function loader({ request, params }) {
//     const userId = await requireUserSession(request);
//     if (!userId) {
//       redirect("/auth?mode=login");
//     }
//     return userId
//   }
