import { Link } from "@remix-run/react";
import { FaHockeyPuck } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-5">
      <div
        id="logo"
        style={{ textAlign: "center" }}
        className="text-white flex justify-center"
      >
        <p>{`Copyright © ${year} `}</p>
        <div className="px-1"></div>
        <Link to="/" className="underline text-white">
          NYR Season Ticket Exchange{" "}
        </Link>
      </div>
      <div></div>
      <div className="text-red flex justify-center items-center py-5">
        <FaHockeyPuck size="2rem" />
      </div>
    </footer>
  );
}

export default Footer;
