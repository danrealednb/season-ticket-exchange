import { NavLink, Form, useLoaderData, Link } from "@remix-run/react";
import Logo from "~/components/utils/Logo";
import { FaBars, FaArrowsAltV } from "react-icons/fa";
import { useState } from "react";

function SideNav() {
  //   const userId = useLoaderData();

  const [open, setopen] = useState(true);
  const toggleOpen = () => {
    setopen(!open);
  };

  return (
    <>
      <div className="flex justify-center items-center space-x-2">
        <h1 className="text-white text-xl underline">
          <Link to="/">New York Rangers Season Ticket Exchange</Link>
        </h1>
        <Logo />
      </div>
      <div className="flex justify-center items-center text-white ">
        <button
          // className="flex justify-end px-10 py-10 text-white"
          onClick={toggleOpen}
        >
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
              <li className="flex-auto">
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
                  to="/profile"
                  className="text-xl font-bold hover:underline hover:text-red [&.active]:text-red underline decoration-red text-white"
                  end
                >
                  Profile
                </NavLink>
              </li>
              {/* <li className="flex-auto">
                <NavLink
                  to="/collection"
                  className="text-xl font-bold hover:underline hover:text-red [&.active]:text-red underline decoration-red text-white"
                  end
                >
                  Collection
                </NavLink>
              </li> */}
              <li className="flex-auto text-white">
                <Form method="post" id="logout-form" action="/logout">
                  <button>Logout</button>
                </Form>
                {/* <Form method="post" id="logout-form" action="/logout">
                {userId && (
                    <button className="text-yellow font-bold text-xl rounded underline">
                      Logout
                    </button>
                  )}
                </Form>
                {!userId && (
                  <Link to="/auth" className="cta">
                    Login
                  </Link>
                )} */}
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
}

export default SideNav;
