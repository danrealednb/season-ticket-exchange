import {
  Link,
  Form,
  useNavigation,
  useLoaderData,
  useParams,
  useActionData,
} from "@remix-run/react";
import { gameInfo } from "~/data/schedule";

function TicketDetailForm() {
  const ticketData = useLoaderData();
  const game = gameInfo(ticketData.game);

  return (
    <Form method="post" className="form" id="ticket-detail-form">
      <div className="grid justify-center items-center space-y-2 text-center text-white">
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Opponent:</label>
          <p>{game.opponent}</p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Date:</label>
          <p>{game.date.toString()}</p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Time:</label>
          <p>{game.time}</p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Section:</label>
          <p>{ticketData.section}</p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Row:</label>
          <p>{ticketData.row}</p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Seats:</label>
          <p>{ticketData.seats}</p>
        </div>

        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Aisle Seat:</label>
          <p>{ticketData.aisleSeat}</p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Discount Code:</label>
          <p>{ticketData.discountCodeIncluded}</p>
        </div>

        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Price:</label>
          <p>{ticketData.price}</p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Total Price:</label>
          <p>$150</p>
        </div>
        <div className="grid justify-center items-center space-x-2 text-center">
          <label className="font-bold">Notes:</label>
          <p>{ticketData.notes}</p>
        </div>
        <div className="flex justify-center items-center py-2">
          <button className="rounded bg-red px-2">Reserve Tickets</button>
        </div>
      </div>
    </Form>
  );
}

export default TicketDetailForm;
