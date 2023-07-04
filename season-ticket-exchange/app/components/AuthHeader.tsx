import Logo from "~/components/utils/Logo";
import { Link, NavLink, useLoaderData, Form } from "@remix-run/react";

function AuthHeader() {
  const userId = useLoaderData();
  // console.log("---LOADER DATA USER ID AUTH HEADER---", userId);
  return (
    <header id="main-header">
      <div className="flex justify-center items-center text-center space-x-2">
        <h1 className="text-white text-xl">
          New York Rangers Season Ticket Exchange
        </h1>
        <Logo />
      </div>
    </header>
  );
}

export default AuthHeader;
