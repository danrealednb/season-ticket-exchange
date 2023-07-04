import { FaTicketAlt, FaHockeyPuck, FaChair } from "react-icons/fa";
import { getUserCount, requireUserSession } from "~/data/auth.server";
import { useLoaderData, Link } from "@remix-run/react";
import SideNav from "~/components/NavigationMenu";
import { getTicketsCount } from "~/data/tickets.server";

export default function Index() {
  const { userCount, ticketCount } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <SideNav />
      {/* <MainHeader /> */}
      <h1 className="text-xl font-bold text-white flex justify-center text-center py-10">
        Welcome to the New York Rangers Season Ticket Exchange
      </h1>
      <div className="grid justify-center">
        <p className="text-white text-center px-5">
          Season Ticket Exchange is for the real fans of the game. It's for the
          season ticket holders looking to put their seats in the hands of fans
          who are looking for tickets at face value without all the absurd fees
          like on other sites.
        </p>
        <p className="text-white text-center px-5">
          If you have any feature requests please email{" "}
          <a
            className="underline"
            href="mailto:djreale@gmail.com?subject=MBB%20Feedback"
          >
            djreale@gmail.com
          </a>
        </p>
        <p className="text-white text-center py-5 flex justify-center text-white space-x-2 pt-5 px-5">
          Start selling{" "}
          <Link to="/mytickets" className="underline px-2">
            <FaTicketAlt className="text-gray text-3xl" />
          </Link>
          today!
        </p>
        <p className="text-white text-center py-5 flex justify-center text-white space-x-2 pt-5">
          Find great{" "}
          <Link to="/tickets" className="underline px-2">
            <FaChair className="text-gray text-3xl" />
          </Link>
          today!
        </p>
      </div>
      <div className="grid justify-center items-center text-white text-center space-x-2 pt-10 pb-5">
        <h2 className="font-bold text-xl underline">Season Ticket Stats</h2>

        <div className="flex justify-center space-x-2">
          <label>User Count:</label>
          <p className="font-bold text-yellow underline">{userCount}</p>
        </div>
        <div className="flex justify-center space-x-2">
          <label>Ticket Count:</label>
          <p className="font-bold text-yellow underline">{ticketCount}</p>
        </div>
        {/* <div className="flex justify-center">
          <label>Sold Ticket Count:</label>
          <p className="font-bold text-yellow underline">{spiritsCount}</p>
        </div> */}
      </div>
    </div>
  );
}
export async function loader({ request }) {
  // const userId = await requireUserSession(request);
  const userCount = await getUserCount();
  const ticketCount = await getTicketsCount();
  return { userCount, ticketCount };
}
