import {
  NavLink,
  Form,
  useLoaderData,
  Link,
  useMatches,
} from "@remix-run/react";
import Logo from "~/components/utils/Logo";
import { FaBars, FaArrowsAltV } from "react-icons/fa";
import { useState } from "react";
import { redirect } from "@remix-run/node";

function AdminMenu() {
  const { userId, userData } = useLoaderData();

  console.log(userData.role);
  const adminUser = userData.role === "ADMIN";
  console.log(adminUser);

  const matches = useMatches();
  // console.log(matches);
  const { pathname } = matches[matches.length - 1];
  const matchedRouteHome = pathname === "/" ? true : false;
  // if profile link is clicked from home link or a different link
  const profilePath = matchedRouteHome
    ? `/profile/${userId.userId}`
    : `/profile/${userId}`;

  const [open, setopen] = useState(true);
  const toggleOpen = () => {
    setopen(!open);
  };
  if (adminUser) {
    return (
      <>
        <div className="flex justify-center items-center text-white ">
          <button onClick={toggleOpen}>
            {open && <FaArrowsAltV className="text-red" />}
            {!open && <FaBars className="text-red" />}
          </button>
        </div>
        {open && (
          <header>
            <nav
              id="main-nav"
              className="flex items-center justify-center items-center pb-5"
            >
              <ul className="flex items-center space-x-5 space-y-5">
                <li className="flex-auto"></li>
                <li className="flex-auto">
                  <NavLink
                    className="text-xl font-bold hover:underline hover:text-red [&.active]:text-red underline decoration-red text-white underline decoration-red text-white"
                    to="/"
                    end
                  >
                    Verify
                  </NavLink>
                </li>
                <li className="flex-auto">
                  <NavLink
                    to="/tickets"
                    className="text-xl font-bold hover:underline hover:text-red [&.active]:text-red underline decoration-red text-white underline decoration-red text-white"
                    end
                  >
                    Terrify
                  </NavLink>
                </li>
              </ul>
            </nav>
          </header>
        )}
      </>
    );
  }
}

export default AdminMenu;
