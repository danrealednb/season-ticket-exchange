import { Link } from "@remix-run/react";
import {FaHockeyPuck} from 'react-icons/fa'
import new_york_rangers from "../../../public/team_logos/new_york_rangers.svg";

function Logo() {
  return (
    <h1 id="logo" className="flex justify-center items-center text-center text-red py-5 px-2">

      <Link to="/">
        {/* <FaHockeyPuck size="2rem"/> */}
        <img src={new_york_rangers} alt="New York Rangers" className="object-scale-down h-12 w-12" />
      </Link>

      
    </h1>
  );
}

export default Logo;
