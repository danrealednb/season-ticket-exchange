import { FaPlus, FaTicketAlt } from "react-icons/fa";
import { Link, useLoaderData } from "@remix-run/react";
import { getUserTickets, getUsersReservedTickets } from "~/data/tickets.server";
import TicketList from "~/components/tickets/TicketList";
import ReservedTicketList from "~/components/tickets/ReservedTicketList";
import { requireUserSession, getUserProfile } from "~/data/auth.server";

export default function MyTicketsPage() {
  const { userId, user, tickets, reservedTickets } = useLoaderData();
  const hasTickets = tickets && tickets.length > 0;
  const userVerified = user.verified === "VERIFIED";
  const hasReservedTickets = reservedTickets && reservedTickets.length > 0;

  return (
    <>
      <div className="flex justify-center items-center text-center text-white underline space-x-5">
        <a
          className="font-bold"
          href="javascript:document.getElementById('my-tickets-for-sale').scrollIntoView(true);"
        >
          Tickets For Sale
        </a>

        <a
          className="font-bold"
          href="javascript:document.getElementById('my-reserved-tickets').scrollIntoView(true);"
        >
          Reserved/Purchased Tickets
        </a>
      </div>

      <h2
        id="my-tickets-for-sale"
        className="text-white flex justify-center text-4xl underline py-5"
      >
        My Tickets
      </h2>

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

        <h2
          id="my-reserved-tickets"
          className="text-white flex justify-center text-4xl underline py-5"
        >
          My Reserved Tickets
        </h2>
        {hasReservedTickets && <ReservedTicketList tickets={reservedTickets} />}
      </main>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const user = await getUserProfile(userId);
  const tickets = await getUserTickets(userId);
  const reservedTickets = await getUsersReservedTickets(user?.email);
  return { userId, user, tickets, reservedTickets };
}
