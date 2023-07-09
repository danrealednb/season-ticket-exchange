import { Link, useFetcher, Form } from "@remix-run/react";
import { GAME, schedule } from "~/data/schedule";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";

function ReservedTicketListItem({ id, ticket }) {
  const fetcher = useFetcher();

  const gameInfo = schedule.filter(
    (game: GAME) => game.game === ticket.game
  )[0];

  const numberOfSeats = ticket.seats.length;
  //   const totalPrice = numberOfSeats * ticket.price;
  const ticketStatusReserved = ticket.status === "RESERVED";
  const ticketStatusPending = ticket.status === "PENDING";
  const ticketStatusSold = ticket.status === "SOLD";
  const paidStatusPending = ticket.paid === "PENDING_PAYMENT";
  const paidStatusSellerAcceptance =
    ticket.paid === "PENDING_SELLER_ACCEPTANCE";
  const paidStatusPaymentComplete = ticket.paid === "PAYMENT_COMPLETE";
  //   console.log("TICKET STATUS", ticketStatus);

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

  const emailContact = `mailto:${ticket.seller}?subject=Rangers%20Tickets`;

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

  function MarkTicketAsPaidItemHandler() {
    const proceed = confirm(
      `Are you sure you want to mark this ticket as paid? (${
        gameInfo.opponent
      } ${gameInfo.date.toString()} ${gameInfo.time})`
    );

    if (!proceed) {
      return;
    }
    fetcher.submit(
      { intent: "paid" },
      {
        method: "patch",
        action: `/mytickets/${id}`,
      }
    );
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

        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Aisle Seat:</label>
          <p>
            {ticket.aisleSeat === true ? (
              <FaCheckCircle className="text-green text-l" />
            ) : (
              <FaTimesCircle className="text-red text-l" />
            )}
          </p>
        </div>
        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Discount Code:</label>
          <p>
            {ticket.discountCodeIncluded === true ? (
              <FaCheckCircle className="text-green text-l" />
            ) : (
              <FaTimesCircle className="text-red text-l" />
            )}
          </p>
        </div>

        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Suite:</label>
          <p>
            {ticket.suite === true ? (
              <FaCheckCircle className="text-green text-l" />
            ) : (
              <FaTimesCircle className="text-red text-l" />
            )}
          </p>
        </div>

        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Chase Bridge:</label>
          <p>
            {ticket.chaseBridge === true ? (
              <FaCheckCircle className="text-green text-l" />
            ) : (
              <FaTimesCircle className="text-red text-l" />
            )}
          </p>
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
      <menu className="expense-actions flex justify-center items-center py-5 space-x-2">
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
              Pay
            </button>
          </div>
        )} */}
        {/* {ticketStatusSold && <p className="font-bold text-gray">Purchased</p>} */}
        {/* if reserved and not paid show this */}
        {ticketStatusReserved && paidStatusPending && (
          <div>
            <div className="flex justify-center items-center text-center space-x-2 py-2">
              <button
                onClick={unReserveTicketItemHandler}
                className="rounded px-2 bg-red"
              >
                Release
              </button>
              <button
                onClick={MarkTicketAsPaidItemHandler}
                className="rounded px-2 bg-green"
              >
                Paid
              </button>
            </div>
            <div className="grid justify-center items-center">
              <label className="underline italic">
                Payments can be maid to any of the following:
              </label>
              <div className="flex justify-center items-center text-center space-x-2">
                <label htmlFor="">PayPal: </label>
                <p>{ticket.paypal}</p>
              </div>
              <div className="flex justify-center items-center text-center space-x-2">
                <label htmlFor="">Zelle: </label>
                <p>{ticket.zelle}</p>
              </div>
              <div className="flex justify-center items-center text-center space-x-2">
                <label htmlFor="">Venmo: </label>
                <p>{ticket.venmo}</p>
              </div>
            </div>
          </div>
        )}
        {/* if reserved and paid show this */}
        {ticketStatusPending && paidStatusSellerAcceptance && (
          <div className="flex justify-center items-center text-center space-x-2">
            <FaExclamationCircle className="text-amber" />
            <p className="text-amber italic">
              Payment is awaiting seller acceptance
            </p>
          </div>
        )}
        {/* if ticket is paid and seller has accepted acknowledged payment */}
        {ticketStatusSold && paidStatusPaymentComplete && (
          <div className="flex justify-center items-center text-center space-x-2">
            <FaCheckCircle className="text-green" />
            <p className="font-bold text-green italic">Transaction Completed</p>
          </div>
        )}
      </menu>

      <div className="expense-actions flex justify-center items-center space-x-2">
        <a className="underline" href={emailContact}>
          Email Seller
        </a>
      </div>
    </article>
  );
}

export default ReservedTicketListItem;
