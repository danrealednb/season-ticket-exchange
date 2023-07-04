import { Link, useFetcher } from "@remix-run/react";
import { GAME, schedule } from "~/data/schedule";

function TicketListItem({ id, ticket }) {
  const fetcher = useFetcher();

  const gameInfo = schedule.filter(
    (game: GAME) => game.game === parseInt(ticket.game)
  )[0];

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
          {gameInfo.time}...
        </p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div className="grid justify-center items-center text-center text-white">
        <h2 className="expense-title font-bold py-1 text-lg">
          {gameInfo.opponent} {gameInfo.date.toString()} {gameInfo.time}
        </h2>
        <p>${ticket.price}</p>
        <p>Total Price $150</p>
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
