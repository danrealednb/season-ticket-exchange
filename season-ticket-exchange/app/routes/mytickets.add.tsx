import TicketsForm from "~/components/tickets/TicketsForm";
import { addTicket } from "~/data/tickets.server";
import { redirect } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

export default function AddTicketsPage() {
  return (
    <>
      <h1 className="text-white text-xl flex justify-center py-5">
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
  const obj = {
    game: ticketData.game,
    section: ticketData.section,
    row: ticketData.row,
    seats: ticketData.seats,
    aisleSeat: ticketData.aisleSeat === "true",
    discountCodeIncluded: ticketData.discountCodeIncluded === "true",
  };
  console.log(ticketData);
  console.log(obj);
  try {
    await addTicket(obj, userId);
    return redirect("/mytickets");
  } catch (error) {
    if (error.status === 422 || error.status === 401) {
      return { brand: error.message };
    }
  }
}
