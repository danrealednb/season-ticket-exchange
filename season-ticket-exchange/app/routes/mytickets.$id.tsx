import { redirect } from "@remix-run/node";
import TicketsForm from "~/components/tickets/TicketsForm";
import { deleteTicket, getTicket, updateTicket } from "~/data/tickets.server";

export default function UpdateTicketsPage() {
  return (
    <>
      <h1 className="text-white text-xl flex justify-center py-5">
        Update Tickets
      </h1>
      <TicketsForm />
    </>
  );
}

export async function action({ params, request }) {
  const ticketId = params.id;
  if (request.method === "PATCH") {
    const formData = await request.formData();
    const ticketData = Object.fromEntries(formData);
    const obj = {
      game: ticketData.game,
      section: ticketData.section,
      row: ticketData.row,
      seats: ticketData.seats,
      price: ticketData.price,
      aisleSeat: ticketData.aisleSeat === "true",
      discountCodeIncluded: ticketData.discountCodeIncluded === "true",
      notes: ticketData.notes,
    };
    await updateTicket(ticketId, obj);
    return redirect("/mytickets");
  } else if (request.method === "DELETE") {
    await deleteTicket(ticketId);
    return redirect("/mytickets");
    // return { deletedId: data };
  }
}

export async function loader({ params }) {
  const ticketId = params.id;
  const ticket = await getTicket(ticketId);
  if (!ticket) {
    throw new Response("Ticket not found", { status: 404 });
  }
  return ticket;
}
