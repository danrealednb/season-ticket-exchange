import { Link, useFetcher, Form } from "@remix-run/react";
import { GAME, schedule } from "~/data/schedule";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function TicketListItem({ id, ticket }) {
  const fetcher = useFetcher();

  const gameInfo = schedule.filter(
    (game: GAME) => game.game === ticket.game
  )[0];

  const numberOfSeats = ticket.seats.length;
  // const totalPrice = numberOfSeats * ticket.price;
  // const ticketStatus = ticket.status;
  //   console.log("TICKET STATUS", ticketStatus);
  const ticketStatusReserved = ticket.status === "RESERVED";
  const ticketStatusPending = ticket.status === "PENDING";
  const ticketStatusSold = ticket.status === "SOLD";
  const paidStatusPending = ticket.paid === "PENDING_PAYMENT";
  const paidStatusSellerAcceptance =
    ticket.paid === "PENDING_SELLER_ACCEPTANCE";
  const paidStatusPaymentComplete = ticket.paid === "PAYMENT_COMPLETE";

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
          Deleting/Unreserving Tickets for {gameInfo.opponent}{" "}
          {gameInfo.date.toString()} {gameInfo.time} ({gameInfo.gameType})...
        </p>
      </article>
    );
  }

  const emailContact = `mailto:${ticket.buyer}?subject=Rangers%20Tickets`;

  function unReserveTicketItemHandler() {
    const proceed = confirm(
      `Are you sure you want to relase these tickets and put them back on the market? (${
        gameInfo.opponent
      } ${gameInfo.date.toString()} ${gameInfo.time})`
    );

    if (!proceed) {
      return;
    }
    fetcher.submit(
      { intent: "release" },
      {
        method: "patch",
        action: `/mytickets/${id}`,
      }
    );
  }

  function SellTicketItemHandler() {
    const proceed = confirm(
      `Are you sure? Do you want to mark this ticket as sold? (${
        gameInfo.opponent
      } ${gameInfo.date.toString()} ${gameInfo.time})`
    );

    if (!proceed) {
      return;
    }
    fetcher.submit(
      { intent: "sold" },
      {
        method: "patch",
        action: `/mytickets/${id}`,
      }
    );
    alert("Your Tickets Are Now Sold!");
  }

  return (
    <article className="expense-item">
      <div className="grid justify-center items-center text-center text-white">
        <div className="flex justify-center items-center">
          <img
            className="object-scale-down h-16 w-16"
            src={gameInfo.teamLogo}
          />
        </div>
        <div className="flex justify-center items-center text-center space-x-2">
          <h2 className="expense-title font-bold py-1 text-lg">
            {gameInfo.opponent} {gameInfo.date.toString()} {gameInfo.time} (
            {gameInfo.gameType})
          </h2>
        </div>

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
          <p>${ticket.totalPrice}</p>
        </div>

        <div className="flex justify-center space-x-2">
          <label className="font-bold">Ticket Status:</label>
          <p className="italic">{ticket.status}</p>
        </div>

        <div className="flex justify-center space-x-2">
          <label className="font-bold">Paid Status:</label>
          <p className="italic">{ticket.paid}</p>
        </div>
      </div>
      <menu className="expense-actions grid justify-center items-center py-5 space-x-2">
        <div className="flex justify-center items-center text-center space-x-2 py-2">
          <button className="px-1 py-1 bg-dark-blue text-white rounded">
            <Link to={id}>Edit</Link>
          </button>
          <button
            className="px-1 py-1 bg-red text-white rounded"
            onClick={deleteExpenseItemHandler}
          >
            Delete
          </button>
        </div>

        {/* if ticket is reserved by a buyer but not paid yet */}
        {ticketStatusReserved && paidStatusPending && (
          <div className="grid justify-center items-center text-center space-x-2 py-2">
            <button
              onClick={unReserveTicketItemHandler}
              className="rounded px-2 bg-red"
            >
              Release Tickets
            </button>
            <div className="flex justify-center items-center text-center space-x-2 py-2">
              <FaExclamationCircle className="text-amber" />
              <p className="text-amber italic">Reserved by {ticket.buyer}</p>
            </div>
          </div>
        )}

        {/* if ticket is paid by buyer but seller has not accepted or acknowledged payment yet */}
        {ticketStatusPending && paidStatusSellerAcceptance && (
          <div className="grid justify-center items-center text-center space-x-2 py-2">
            <button
              onClick={SellTicketItemHandler}
              className="rounded px-2 bg-red"
            >
              Accept Payment
            </button>
            <div className="flex justify-center items-center text-center space-x-2 py-2">
              <FaExclamationCircle className="text-amber" />
              <p className="text-amber italic">Reserved by {ticket.buyer}</p>
            </div>
          </div>
        )}

        {/* if seller has accepted received payment and ticket is officially sold */}
        {ticketStatusSold && paidStatusPaymentComplete && (
          <div className="flex justify-center items-center text-center space-x-2">
            <FaCheckCircle className="text-green" />
            <p className="text-green italic">Purchased by {ticket.buyer}</p>
          </div>
        )}

        {/* {ticketStatusReserved && (
          <div className="expense-actions flex justify-center items-center space-x-2">
            <button
              className="px-1 py-1 bg-red text-white rounded"
              onClick={unReserveTicketItemHandler}
            >
              Market
            </button>
            <button
              className="px-1 py-1 bg-red text-white rounded"
              onClick={SellTicketItemHandler}
            >
              Sold
            </button>
            <a className="underline" href={emailContact}>
              Email Buyer
            </a>
          </div>
        )}
        {ticketStatus === "SOLD" && (
          <p className="font-bold text-gray">Sold ({ticket.buyer})</p>
        )} */}
        <a className="underline text-center" href={emailContact}>
          Email Buyer
        </a>
      </menu>
    </article>
  );
}

export default TicketListItem;
