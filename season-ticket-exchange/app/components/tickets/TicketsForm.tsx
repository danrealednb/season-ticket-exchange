import {
  Link,
  Form,
  useNavigation,
  useLoaderData,
  useParams,
  useActionData,
} from "@remix-run/react";
import { useState } from "react";
import { GAME, schedule } from "~/data/schedule";

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
        seats: ticketData.seats,
        aisleSeat: ticketData.aisleSeat,
        discountCodeIncluded: ticketData.discountCodeIncluded,
      }
    : {
        game: "",
        section: "",
      };

  if (params.id && !ticketData) {
    // invalid id
    return <p className="text-white">Invalid Ticket Id</p>;
  }

  // const [buttonText, setButtonText] = useState("Cancel");

  const [game, setGame] = useState();
  const handleChangeGame = (e) => {
    const game = e.target.value;
    setGame(game);
  };

  const [aisleSeat_cb, setAisleSeatCB] = useState(false);

  const handleAisleSeatCB = (e) => {
    setAisleSeatCB(e.target.checked);
  };

  const [discountCode_cb, setDiscountCodeCB] = useState(false);

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
          className="border-2 border-white rounded"
          defaultValue={game}
        >
          {schedule.map((game: GAME) => {
            return (
              <option key={game.game} value={game.game}>
                {game.opponent} {game.date.toString()} {game.time}
              </option>
            );
          })}
        </select>
      </p>
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
          defaultValue={defaultValues.section}
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
          defaultValue={defaultValues.section}
          placeholder="Enter Seats Here"
        />
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
