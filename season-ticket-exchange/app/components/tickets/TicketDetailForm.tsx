import {
  Link,
  Form,
  useNavigation,
  useLoaderData,
  useParams,
  useActionData,
} from "@remix-run/react";
import { gameInfo } from "~/data/schedule";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function TicketDetailForm() {
  const ticketData = useLoaderData();
  const game = gameInfo(ticketData.game);

  const numberOfSeats = ticketData.seats.length;
  const totalPrice = numberOfSeats * ticketData.price;

  return (
    <Form method="post" className="form" id="ticket-detail-form">
      <div className="grid justify-center items-center space-y-2 text-center text-white">
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">{game.gameType} Game</label>
        </div>
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
          <p>{ticketData.seats.join(",")}</p>
          <p className="font-bold">({numberOfSeats})</p>
        </div>

        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Aisle Seat:</label>
          <p>
            {ticketData.aisleSeat === true ? (
              <FaCheckCircle className="text-green text-l" />
            ) : (
              <FaTimesCircle className="text-red text-l" />
            )}
          </p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Discount Code:</label>
          <p>
            {ticketData.discountCodeIncluded === true ? (
              <FaCheckCircle className="text-green text-l" />
            ) : (
              <FaTimesCircle className="text-red text-l" />
            )}
          </p>
        </div>

        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Price:</label>
          <p>{ticketData.price}</p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Total Price:</label>
          <p>${totalPrice}</p>
        </div>
        <div className="grid justify-center items-center space-x-2 text-center">
          <label className="font-bold underline">Notes</label>
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
