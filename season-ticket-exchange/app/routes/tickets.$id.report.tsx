import ReportTicket from "~/components/tickets/ReportTicket";
import { redirect } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";
import { reportTickets } from "~/data/tickets.server";

export default function ReportTicketsPage() {
  return (
    <>
      <h1 className="text-white text-xl flex justify-center py-5 underline font-bold text-2xl">
        Report Tickets
      </h1>
      <ReportTicket />
    </>
  );
}

export async function loader({ params }) {
  const ticketId = params.id;
  console.log("FOUND ON REPORT PAGE", ticketId);
  return ticketId;
}

export async function action({ request, params }) {
  const ticketId = params.id;
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const reportData = Object.fromEntries(formData);

  try {
    await reportTickets(ticketId, reportData, userId);
    return redirect(`/tickets/${params.id}/report`);
  } catch (error) {
    if (error.status === 422 || error.status === 401) {
      return { brand: error.message };
    }
  }
}
