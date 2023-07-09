import { FaPlus, FaTicketAlt } from "react-icons/fa";
import { Link, useLoaderData } from "@remix-run/react";
import {
  getUserProfile,
  updateUserProfile,
  verifySellerPending,
} from "~/data/auth.server";
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
  // const profile = useLoaderData();

  return (
    <>
      {/* <MainHeader /> */}
      <SideNav />
      <Outlet />
      <h2 className="text-white flex justify-center text-4xl underline py-5">
        My Profile
      </h2>
      {/* <p className="text-white flex justify-center">
        Edit Payment Options and Season tickets/seats.
      </p> */}
      {/* <p>FN:{profile.firstName}</p>
      <p>LN:{profile.lastName}</p> */}
      <ProfileForm />
    </>
  );
}

export async function loader({ request, params }) {
  const userId = await requireUserSession(request);
  if (!userId) {
    redirect("/auth?mode=login");
  }
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
    const seats = profileData.seats.split(",");
    // console.log("FORM DATA", profileData);
    const obj = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      paypal: profileData.paypal,
      zelle: profileData.zelle,
      venmo: profileData.venmo,
      section: profileData.section,
      row: profileData.row,
      seats: seats,
      aisleSeat: profileData.aisleSeat === "true",
      discountCodeIncluded: profileData.discountCodeIncluded === "true",
      suite: profileData.suite === "true",
      chaseBridge: profileData.chaseBridge === "true",
    };
    console.log(obj);

    await updateUserProfile(userId, obj);
    return redirect(`/profile/${userId}`);
  } else if (request.method === "POST") {
    const formData = await request.formData();
    const profileData = Object.fromEntries(formData);

    try {
      validateUpdateProfileSeatInformation(profileData);
      validateProfileSellerVerification(profileData);
      return redirect(`/profile/${userId}`);
    } catch (error) {
      return error;
    }
  }
}
