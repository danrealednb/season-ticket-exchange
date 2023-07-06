import {
  Link,
  Form,
  useNavigation,
  useLoaderData,
  useParams,
  useActionData,
} from "@remix-run/react";
import { gameInfo } from "~/data/schedule";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { seatMap } from "~/data/venue";

function ReserveTicketItemHandler() {
  const proceed = confirm(
    `Are you sure? Do you want to reserve these tickets?`
  );

  if (!proceed) {
    return;
  }
  //   alert("Reserved!");
}

function TicketDetailForm() {
  const ticketData = useLoaderData();
  const game = gameInfo(ticketData.game);

  const numberOfSeats = ticketData.seats.length;
  const totalPrice = numberOfSeats * ticketData.price;

  return (
    <Form method="post" className="form" id="ticket-detail-form">
      <div className="grid justify-center items-center space-y-2 text-center text-white">
        <img className="object-scale-down h-24 w-96" src={game.teamLogo} />

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

        <div>
          <p className=" text-center underline text-red font-bold">
            <a
              href={seatMap(ticketData.section)}
              target="_blank"
              rel="noopener noreferrer"
            >
              See Seats On Map
            </a>
          </p>
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
          <label className="font-bold">Suite:</label>
          <p>
            {ticketData.suite === true ? (
              <FaCheckCircle className="text-green text-l" />
            ) : (
              <FaTimesCircle className="text-red text-l" />
            )}
          </p>
        </div>

        <div className="flex justify-center items-center space-x-2 text-center">
          <label className="font-bold">Chase Bridge:</label>
          <p>
            {ticketData.chaseBridge === true ? (
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
        <div className="grid justify-center space-x-2">
          <label className="font-bold underline">Status</label>
          <p>{ticketData.status}</p>
        </div>

        {ticketData.status === "AVAILABLE" && (
          <div className="flex justify-center items-center py-2">
            <button
              className="rounded bg-red px-2"
              onClick={ReserveTicketItemHandler}
            >
              Reserve Tickets
            </button>
          </div>
        )}

        <div className="flex justify-center items-center py-5 disabled:opacity-75">
          <Link to="report" className="">
            <span className="flex px-1 text-justify items-center space-x-2 text-amber border-2 rounded">
              <label htmlFor="">Report Tickets</label>
              <FaExclamationCircle className="text-amber" />
            </span>
          </Link>
        </div>
      </div>
    </Form>
  );
}

export default TicketDetailForm;
