import { redirect } from "@remix-run/node";
import TicketsForm from "~/components/tickets/TicketsForm";
import { getUserProfile, requireUserSession } from "~/data/auth.server";
import {
  deleteTicket,
  getTicket,
  sellerReceivedPaymentForTickets,
  unReserveTicket,
  updateTicket,
  buyerPaidForTickets,
} from "~/data/tickets.server";

export default function UpdateTicketsPage() {
  return (
    <>
      <h1 className="text-white text-xl flex justify-center py-5 underline font-bold text-2xl">
        Update Tickets
      </h1>
      <TicketsForm />
    </>
  );
}

export async function action({ params, request }) {
  const formData = await request.formData();
  const editIntent = formData.get("intent") === "editTickets";
  const intent = formData.get("intent");
  const paidIntent = formData.get("intent") === "paid";
  const releaseIntent = formData.get("intent") === "release";
  const soldIntent = formData.get("intent") === "sold";
  const ticketId = params.id;
  if (request.method === "PATCH" && editIntent) {
    const ticketData = Object.fromEntries(formData);
    const seats = ticketData.seats.split(",");
    const obj = {
      game: ticketData.game,
      //   section: ticketData.section,
      //   row: ticketData.row,
      seats: seats,
      price: ticketData.price,
      //   aisleSeat: ticketData.aisleSeat === "true",
      //   discountCodeIncluded: ticketData.discountCodeIncluded === "true",
      //   suite: ticketData.suite === "true",
      //   chaseBridge: ticketData.chaseBridge === "true",
      notes: ticketData.notes,
      totalPrice: ticketData.totalPrice,
    };
    // console.log("----UPDATED TICKET----", obj);
    await updateTicket(ticketId, obj);
    return redirect("/mytickets");
  } else if (request.method === "DELETE") {
    await deleteTicket(ticketId);
    return redirect("/mytickets");
  } else if (request.method === "PATCH" && paidIntent) {
    await buyerPaidForTickets(ticketId);
    return redirect("/mytickets");
    // old stuff that works I think
  } else if (request.method === "PATCH" && releaseIntent) {
    await unReserveTicket(ticketId);
    return redirect("/mytickets");
  } else if (request.method === "PATCH" && soldIntent) {
    await sellerReceivedPaymentForTickets(ticketId);
    return redirect("/mytickets");
  }
}

export async function loader({ params, request }) {
  const ticketId = params.id;
  const userId = await requireUserSession(request);
  const ticketData = await getTicket(ticketId);
  const userData = await getUserProfile(userId);
  if (!ticketData) {
    throw new Response("Ticket not found", { status: 404 });
  }
  return { ticketData, userData };
}
