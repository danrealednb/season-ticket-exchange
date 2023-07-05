import { Link, useFetcher } from "@remix-run/react";
import { GAME, schedule } from "~/data/schedule";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function TicketListItem({ id, ticket }) {
  const fetcher = useFetcher();

  const gameInfo = schedule.filter(
    (game: GAME) => game.game === ticket.game
  )[0];

  const numberOfSeats = ticket.seats.length;
  const totalPrice = numberOfSeats * ticket.price;

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p className="text-white">Getting Ticket Details...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div className="grid justify-center items-center text-center text-white">
        <h2 className="expense-title font-bold py-1 text-lg">
          {gameInfo.opponent} {gameInfo.date.toString()} {gameInfo.time} (
          {gameInfo.gameType})
        </h2>
        <div className="flex justify-center space-x-2">
          <label className="font-bold">Price Per Ticket:</label>
          <p>${ticket.price}</p>
        </div>

        <div className="flex justify-center space-x-2">
          <label className="font-bold">Section:</label>
          <p>{ticket.section}</p>
        </div>
        <div className="flex justify-center space-x-2">
          <label className="font-bold">Row:</label>
          <p>{ticket.row}</p>
        </div>

        <div className="flex justify-center space-x-2">
          <label className="font-bold">Seats:</label>
          <p>{ticket.seats.join(",")}</p>
          <p className="font-bold">({numberOfSeats})</p>
        </div>
        <div className="flex justify-center space-x-2">
          <label className="font-bold">Total Price:</label>
          <p>${totalPrice}</p>
        </div>
        <div></div>

        <div className="flex justify-center items-center space-x-2">
          <label className="font-bold">Aisle Seat</label>
          <p>
            {ticket.aisleSeat === true ? (
              <FaCheckCircle className="text-green text-l" />
            ) : (
              <FaTimesCircle className="text-red text-l" />
            )}
          </p>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <label className="font-bold">Discount Code Included</label>
          <p>
            {ticket.discountCodeIncluded === true ? (
              <FaCheckCircle className="text-green text-l" />
            ) : (
              <FaTimesCircle className="text-red text-l" />
            )}
          </p>
        </div>

        <div className="grid justify-center space-x-2">
          <label className="font-bold underline">Notes</label>
          <p>{ticket.notes}</p>
        </div>
      </div>
      <menu className="expense-actions flex justify-center items-center py-5 space-x-2">
        <button className="px-1 py-1 bg-red text-white rounded">
          <Link to={id}>View Tickets</Link>
        </button>
      </menu>
    </article>
  );
}

export default TicketListItem;
