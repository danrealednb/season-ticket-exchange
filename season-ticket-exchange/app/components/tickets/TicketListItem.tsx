import { Link, useFetcher } from "@remix-run/react";
import { GAME, schedule } from "~/data/schedule";

function TicketListItem({ id, ticket }) {
  const fetcher = useFetcher();

  const gameInfo = schedule.filter(
    (game: GAME) => game.game === ticket.game
  )[0];

  const numberOfSeats = ticket.seats.length;
  const totalPrice = numberOfSeats * ticket.price;

  function deleteExpenseItemHandler() {
    const proceed = confirm(
      `Are you sure? Do you want to delete this ticket? (${
        gameInfo.opponent
      } ${gameInfo.date.toString()} ${gameInfo.time})`
    );

    if (!proceed) {
      return;
    }
    fetcher.submit(null, {
      method: "delete",
      action: `/mytickets/${id}`,
    });
  }

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p className="text-white">
          Deleting Tickets for {gameInfo.opponent} {gameInfo.date.toString()}{" "}
          {gameInfo.time} ({gameInfo.gameType})...
        </p>
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
      </div>
      <menu className="expense-actions flex justify-center items-center py-5 space-x-2">
        <button className="px-1 py-1 bg-dark-blue text-white rounded">
          <Link to={id}>Edit</Link>
        </button>
        <button
          className="px-1 py-1 bg-red text-white rounded"
          onClick={deleteExpenseItemHandler}
        >
          Delete
        </button>
      </menu>
    </article>
  );
}

export default TicketListItem;
