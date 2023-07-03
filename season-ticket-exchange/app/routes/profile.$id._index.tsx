import { FaPlus, FaTicketAlt } from "react-icons/fa";
import { Link, useLoaderData } from "@remix-run/react";
import { getUserProfile, updateUserProfile } from "~/data/auth.server";
import { Outlet } from "@remix-run/react";
import { requireUserSession } from "~/data/auth.server";
import SideNav from "~/components/NavigationMenu";
import { redirect } from "@remix-run/node";
import ProfileForm from "~/components/profile/ProfileForm";
import {
  validateProfileSellerVerification,
  validateUpdateProfileSeatInformation,
} from "~/data/validation.server";

export default function MyTicketsPage() {
  const profile = useLoaderData();

  return (
    <>
      {/* <MainHeader /> */}
      <SideNav />
      <Outlet />
      <h1 className="text-white flex justify-center">
        My Profile Page Goes Here
      </h1>
      <p className="text-white flex justify-center">
        Edit Payment Options and Season tickets/seats.
      </p>
      {/* <p>FN:{profile.firstName}</p>
      <p>LN:{profile.lastName}</p> */}
      <ProfileForm />
    </>
  );
}

export async function loader({ request, params }) {
  if (!params) {
    const userId = await requireUserSession(request);
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Response("User Profile not found", { status: 404 });
    }
    return profile;
  } else {
    const userId = params.id;
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Response(`User Profile for user ${userId} not found`, {
        status: 404,
        statusText: `User Profile for user ${userId} not found`,
      });
    }
    return profile;
  }
}

export async function action({ request }) {
  const userId = await requireUserSession(request);
  // const userId = params ? params.id : storedUserId;

  if (request.method === "PATCH") {
    const formData = await request.formData();
    const profileData = Object.fromEntries(formData);

    try {
      validateUpdateProfileSeatInformation(profileData);
    } catch (error) {
      return error;
    }

    await updateUserProfile(userId, profileData);
    return redirect(`/profile/${userId}`);
  } else if (request.method === "POST") {
    const formData = await request.formData();
    const profileData = Object.fromEntries(formData);
    console.log("TRYING TO VERIFY SELLER");
    console.log(profileData);

    try {
      // validateProfileSeatInformation(profileData);
      validateProfileSellerVerification(profileData);
    } catch (error) {
      return error;
    }

    // TODO: need to implement workflow for verifying seller
    return redirect(`/profile/${userId}`);
  }
}
