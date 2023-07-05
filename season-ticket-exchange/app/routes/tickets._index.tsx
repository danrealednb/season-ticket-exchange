import { FaPlus } from "react-icons/fa";
import { Link, useLoaderData } from "@remix-run/react";
import {
  getAvailableTickets,
  getAvailableTicketsSearch,
} from "~/data/tickets.server";
import TicketDetailList from "~/components/tickets/TicketDetailList";
import TicketFilter from "~/components/tickets/TicketFilter";

export default function TicketsPage() {
  const tickets = useLoaderData();
  const hasTickets = tickets && tickets.length > 0;
  return (
    <>
      <main className="">
        <TicketFilter path="/tickets" />

        {hasTickets && <TicketDetailList tickets={tickets} />}
        {!hasTickets && (
          <section
            id="no-events"
            className="flex justify-center items-center text-center py-5"
          >
            <div className="grid justify-center text-center">
              <h1 className="text-white">Sorry. No tickets found.</h1>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const query = search.get("query") || null;
  if (!query) {
    const tickets = await getAvailableTickets();
    return tickets;
  } else {
    const gameId = parseInt(query);
    const tickets = await getAvailableTicketsSearch(gameId);
    return tickets;
  }
}
