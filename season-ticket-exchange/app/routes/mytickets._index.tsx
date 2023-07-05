import { FaPlus, FaTicketAlt } from "react-icons/fa";
import { Link, useLoaderData } from "@remix-run/react";
import { getUserTickets } from "~/data/tickets.server";
import TicketList from "~/components/tickets/TicketList";
import { requireUserSession, getUserProfile } from "~/data/auth.server";

export default function MyTicketsPage() {
  const { userId, user, tickets } = useLoaderData();
  const hasTickets = tickets && tickets.length > 0;
  const userVerified = user.verified;

  return (
    <>
      <main className="">
        {userVerified && (
          <div className="flex justify-center items-center py-5 disabled:opacity-75">
            <Link to="add" className="">
              <span className="flex px-1 text-justify items-center space-x-2 text-white border-2 rounded">
                <FaPlus className="text-white" /> Add Tickets
                <FaTicketAlt className="text-white" />
              </span>
            </Link>
          </div>
        )}

        {!userVerified && (
          <div>
            <div className="flex justify-center items-center py-5 disabled:opacity-75">
              <Link
                to="add"
                className=""
                onClick={(event) => event.preventDefault()}
              >
                <span className="flex px-1 text-justify items-center space-x-2 text-gray border-2 rounded">
                  <FaPlus className="text-gray" /> Add Tickets
                  <FaTicketAlt className="text-gray" />
                </span>
              </Link>
            </div>
            <p className="text-center text-white">
              {" "}
              **You are not verified to sell tickets**
            </p>
          </div>
        )}

        {hasTickets && <TicketList tickets={tickets} />}

        {!hasTickets && userVerified && (
          <section id="no-events" className="flex justify-center">
            <div className="grid justify-center text-center">
              <h1 className="text-white">No tickets found</h1>
              <p className="text-white">
                Start{" "}
                <Link to="add" className="underline">
                  selling some
                </Link>{" "}
                today.
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const user = await getUserProfile(userId);
  const tickets = await getUserTickets(userId);
  //   return tickets;
  return { userId, user, tickets };
}
