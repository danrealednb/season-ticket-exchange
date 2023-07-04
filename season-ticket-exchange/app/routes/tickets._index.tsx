import { FaPlus } from "react-icons/fa";
import { Link, useLoaderData } from "@remix-run/react";
import { getAvailableTickets } from "~/data/tickets.server";
import TicketDetailList from "~/components/tickets/TicketDetailList";

export default function TicketsPage() {
  const tickets = useLoaderData();
  const hasTickets = tickets && tickets.length > 0;
  return (
    <>
      {/* <h1 className="text-white flex justify-center">Tickets Page Goes Here</h1>
      <p className="text-white flex justify-center">
        This page will have a filter and listing of all available tickets. All
        tickets for past games will be filtered out.
      </p> */}
      <main className="">
        {/* <div className="flex justify-center py-5">
          <Link to="add" className="">
            <span className="flex px-1 text-justify text-white border-2 rounded">
              <FaPlus className="text-white" />
              Add Brand
            </span>
          </Link>
        </div> */}

        {hasTickets && <TicketDetailList tickets={tickets} />}
        {!hasTickets && (
          <section id="no-events" className="flex justify-center">
            <div className="grid justify-center text-center">
              <h1 className="text-white">No tickets found</h1>
              <p className="text-white">
                Start{" "}
                <Link to="/mytickets/add" className="underline">
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

export async function loader() {
  const tickets = await getAvailableTickets();
  return tickets;
}
