import {
  Link,
  Form,
  useNavigation,
  useLoaderData,
  useParams,
  useActionData,
} from "@remix-run/react";
import { useState } from "react";
import { GAME, schedule, getRemainingSchedule } from "~/data/schedule";

function TicketsForm() {
  const ticketData = useLoaderData();
  const validationErrors = useActionData();
  const params = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const defaultValues = ticketData
    ? {
        game: ticketData.game,
        section: ticketData.section,
        row: ticketData.row,
        seats: ticketData.seats.join(","),
        price: ticketData.price,
        aisleSeat: ticketData.aisleSeat,
        discountCodeIncluded: ticketData.discountCodeIncluded,
        notes: ticketData.notes,
      }
    : {
        game: "",
        section: "",
        row: "",
        seats: "",
        price: "",
        aisleSeat: "",
        discountCodeIncluded: "",
        notes: "",
      };

  if (params.id && !ticketData) {
    // invalid id
    return <p className="text-white">Invalid Ticket Id</p>;
  }

  // const [buttonText, setButtonText] = useState("Cancel");

  const [full_price, setFullPrice] = useState(0);
  const handleChangePrice = (e) => {
    const priceOneTicket = parseInt(e.target.value);
    const seats: string = document.getElementById("seats").value;
    const numberOfTickets = seats.split(",").length;
    const fullPrice = priceOneTicket * numberOfTickets;
    setFullPrice(fullPrice);
  };

  const [game, setGame] = useState(defaultValues.game);

  const setDefaultLogo =
    schedule.filter(
      (game: GAME) => game.game === parseInt(defaultValues.game)
    )[0]?.teamLogo || getRemainingSchedule()[0].teamLogo;

  const [team_logo, setTeamLogo] = useState(setDefaultLogo);

  const handleChangeGame = (e) => {
    const gameS = e.target.value;
    const gameInfo = schedule.filter(
      (game: GAME) => game.game === parseInt(gameS)
    )[0];
    setGame(gameInfo);
    setTeamLogo(gameInfo.teamLogo);
  };

  const [aisleSeat_cb, setAisleSeatCB] = useState(defaultValues.aisleSeat);

  const handleAisleSeatCB = (e) => {
    setAisleSeatCB(e.target.checked);
  };

  const [discountCode_cb, setDiscountCodeCB] = useState(
    defaultValues.discountCodeIncluded
  );

  const handleDiscountCodeCB = (e) => {
    setDiscountCodeCB(e.target.checked);
  };

  return (
    <Form
      method={ticketData ? "patch" : "post"}
      //   method="post"
      className="form"
      id="ticket-form"
    >
      <p className="grid justify-center py-5">
        <label htmlFor="name" className="text-white py-2 text-center">
          Choose Game
        </label>
        <select
          id="game"
          name="game"
          onChange={handleChangeGame}
          className="border-2 border-white rounded text-center w-80"
          defaultValue={game}
        >
          {getRemainingSchedule().map((game: GAME) => {
            return (
              <option key={game.game} value={game.game}>
                {game.opponent} {game.date.toString()} {game.time} (
                {game.gameType})
              </option>
            );
          })}
        </select>
      </p>

      <div className="grid justify-center items-center py-2">
        <img className="object-scale-down h-24 w-96" src={team_logo} />
      </div>

      <div className="grid justify-center items-center py-2">
        <label htmlFor="section" className="text-white py-2 text-center">
          Section
        </label>
        <input
          className="border-2 border-white rounded"
          type="text"
          id="section"
          name="section"
          required
          defaultValue={defaultValues.section}
          placeholder="Enter Section Here"
        />
      </div>
      <div className="grid justify-center items-center py-2">
        <label htmlFor="row" className="text-white py-2 text-center">
          Row
        </label>
        <input
          className="border-2 border-white rounded"
          type="text"
          id="row"
          name="row"
          required
          defaultValue={defaultValues.row}
          placeholder="Enter Row Here"
        />
      </div>
      <div className="grid justify-center items-center py-2">
        <label htmlFor="seats" className="text-white py-2 text-center">
          Seats (Example: 1,2,3,4)
        </label>
        <input
          className="border-2 border-white rounded"
          type="text"
          id="seats"
          name="seats"
          required
          defaultValue={defaultValues.seats}
          placeholder="Enter Seats Here"
        />
      </div>
      <div className="grid justify-center items-center py-2">
        <label htmlFor="row" className="text-white py-2 text-center">
          Price (Per Ticket)
        </label>
        <input
          className="border-2 border-white rounded"
          type="number"
          id="price"
          name="price"
          required
          defaultValue={defaultValues.price}
          placeholder="Enter Price Here"
          min="0"
          step="1"
          onChange={handleChangePrice}
        />
      </div>
      <div className="flex justify-center items-center py-2">
        <label className="text-white py-2 text-center">
          Total Price: ${full_price}
        </label>
      </div>
      <div className="flex justify-center items-center space-x-2 py-5">
        <input
          className="rounded"
          id="aisleSeat"
          type="checkbox"
          name="aisleSeat"
          value={aisleSeat_cb === true ? "true" : "false"}
          checked={aisleSeat_cb}
          onChange={handleAisleSeatCB}
        />
        <label htmlFor="opened-radio" className="text-white">
          Aisle Seat
        </label>
        <input
          id="discountCodeIncluded"
          type="checkbox"
          name="discountCodeIncluded"
          className="rounded"
          checked={discountCode_cb}
          value={discountCode_cb === true ? "true" : "false"}
          onChange={handleDiscountCodeCB}
        />
        <label htmlFor="finished-radio" className="text-white">
          Discount Codes
        </label>
      </div>
      <div className="flex justify-center items-center space-x-2 py-5">
        <textarea
          className="border-2 border-white rounded"
          id="notes"
          name="notes"
          defaultValue={defaultValues.notes}
          placeholder="Enter Notes Here"
        />
      </div>
      {validationErrors && (
        <ul className="flex justify-center">
          {Object.values(validationErrors).map((error) => (
            <li className="text-white text-xl" key={error}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <div className="form-actions flex justify-center items-center py-5 space-x-2">
        <button
          disabled={isSubmitting}
          className="px-1 text-white border-2 rounded"
        >
          {isSubmitting ? "Posting..." : "Sell Tickets"}
        </button>
        <button
          className="px-1 text-white border-2 rounded"
          // onClick={() => setButtonText("Cancelling...")}
        >
          {/* {buttonText} */}
          <Link to="..">{isSubmitting ? "Cancelling..." : "Cancel"}</Link>
        </button>
      </div>
    </Form>
  );
}

export default TicketsForm;
