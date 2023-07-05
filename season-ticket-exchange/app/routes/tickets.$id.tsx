import { redirect } from "@remix-run/node";
import TicketDetailForm from "~/components/tickets/TicketDetailForm";
import { getTicket, reserveTicket } from "~/data/tickets.server";
import { getUserProfile, requireUserSession } from "~/data/auth.server";

export default function ViewTicketsPage() {
  return (
    <>
      <h1 className="text-white text-xl flex justify-center py-5 underline font-bold text-2xl">
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
  try {
    const user = await getUserProfile(userId);
    await reserveTicket(ticketId, user?.email);
    return redirect("/tickets");
  } catch (error) {
    if (error.status === 422 || error.status === 401) {
      return { brand: error.message };
    }
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
