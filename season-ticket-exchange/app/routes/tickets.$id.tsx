import { redirect } from "@remix-run/node";
import TicketDetailForm from "~/components/tickets/TicketDetailForm";
import { getTicket, reserveTicket } from "~/data/tickets.server";
import { requireUserSession } from "~/data/auth.server";

export default function ViewTicketsPage() {
  return (
    <>
      <h1 className="text-white text-xl flex justify-center py-5">
        Ticket Details
      </h1>
      <TicketDetailForm />
    </>
  );
}

export async function action({ params, request }) {
  const userId = await requireUserSession(request);
  const ticketId = params.id;
  //   const formData = await request.formData();
  //   const ticketData = Object.fromEntries(formData);
  await reserveTicket(ticketId, userId);

  return redirect("/tickets");
}

export async function loader({ params }) {
  const ticketId = params.id;
  const ticket = await getTicket(ticketId);
  if (!ticket) {
    throw new Response("Ticket not found", { status: 404 });
  }
  return ticket;
}
