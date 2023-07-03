import { Link } from "@remix-run/react";
import {FaHockeyPuck} from 'react-icons/fa'

function Logo() {
  return (
    <h1 id="logo">

      <Link to="/" className="flex justify-center items-center text-red py-5">
        <FaHockeyPuck size="2rem"/>
      </Link>

      
    </h1>
  );
}

export default Logo;
