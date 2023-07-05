import TicketsForm from "~/components/tickets/TicketsForm";
import { addTicket } from "~/data/tickets.server";
import { redirect } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

export default function AddTicketsPage() {
  return (
    <>
      <h1 className="text-white text-xl flex justify-center py-5 underline font-bold text-2xl">
        Sell Tickets
      </h1>
      <TicketsForm />
    </>
  );
}

export async function action({ request }) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const ticketData = Object.fromEntries(formData);
  const seats = ticketData.seats.split(",");
  const obj = {
    game: ticketData.game,
    section: ticketData.section,
    row: ticketData.row,
    seats: seats,
    price: ticketData.price,
    aisleSeat: ticketData.aisleSeat === "true",
    discountCodeIncluded: ticketData.discountCodeIncluded === "true",
    notes: ticketData.notes,
  };
  //   console.log("Ticket Data", ticketData);
  //   console.log("OBJ", obj);
  try {
    await addTicket(obj, userId);
    return redirect("/mytickets");
  } catch (error) {
    if (error.status === 422 || error.status === 401) {
      return { brand: error.message };
    }
  }
}
