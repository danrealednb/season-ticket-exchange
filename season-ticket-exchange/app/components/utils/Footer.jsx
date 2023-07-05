import { Link } from "@remix-run/react";
import { FaHockeyPuck } from "react-icons/fa";
import new_york_rangers from "../../../public/team_logos/new_york_rangers.svg";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-5">
      <div
        id="logo"
        style={{ textAlign: "center" }}
        className="text-white flex justify-center items-center text-center"
      >
        <p>{`Copyright © ${year} `}</p>
        <div className="px-1"></div>
        <Link to="/" className="underline text-white">
          NYR Season Ticket Exchange{" "}
        </Link>
      </div>
      <div></div>
      <div className="text-red flex justify-center items-center text-center py-5">
        {/* <FaHockeyPuck size="2rem" /> */}
        <img src={new_york_rangers} alt="New York Rangers" className="object-scale-down h-12 w-12" />
      </div>
    </footer>
  );
}

export default Footer;
