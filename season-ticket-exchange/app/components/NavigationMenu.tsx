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

function SideNav() {
  const userId = useLoaderData();

  const matches = useMatches();
  // console.log(matches);
  const { pathname } = matches[matches.length - 1];
  const matchedRouteHome = pathname === "/" ? true : false;
  const profilePath = matchedRouteHome
    ? `/profile/${userId.userId}`
    : `/profile/${userId}`;

  const [open, setopen] = useState(true);
  const toggleOpen = () => {
    setopen(!open);
  };

  return (
    <>
      <div className="flex justify-center items-center text-center space-x-2">
        <h1 className="text-white text-xl underline">
          <Link to="/">New York Rangers Season Ticket Exchange</Link>
        </h1>
        <Logo />
      </div>
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
                  Home
                </NavLink>
              </li>
              <li className="flex-auto">
                <NavLink
                  to="/tickets"
                  className="text-xl font-bold hover:underline hover:text-red [&.active]:text-red underline decoration-red text-white underline decoration-red text-white"
                  end
                >
                  Tickets
                </NavLink>
              </li>
              <li className="flex-auto text-center">
                <NavLink
                  to="/mytickets"
                  className="text-xl font-bold hover:underline hover:text-red [&.active]:text-red underline decoration-red text-white"
                  end
                >
                  My Tickets
                </NavLink>
              </li>
              <li className="flex-auto">
                <NavLink
                  to={profilePath}
                  className="text-xl font-bold hover:underline hover:text-red [&.active]:text-red underline decoration-red text-white"
                  end
                >
                  Profile
                </NavLink>
              </li>

              <li className="flex-auto text-white">
                {!userId && (
                  <Link to="/auth" className="cta">
                    <button className="underline">Login</button>
                  </Link>
                )}
                {userId && (
                  <Form
                    method="post"
                    id="logout-form"
                    action="/logout"
                    className="pr-5"
                  >
                    <button className="underline">Logout</button>
                  </Form>
                )}
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
}

export default SideNav;
