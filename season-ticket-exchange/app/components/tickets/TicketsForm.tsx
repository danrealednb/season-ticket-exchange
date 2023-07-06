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
import {
  SECTION,
  seatMap,
  venue,
  getSectionRows,
  getRowSeats,
  getSectionInfo,
} from "~/data/venue";

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
        rowsies: getSectionRows(ticketData.section),
        suite: ticketData.suite,
        chaseBridge: ticketData.chaseBridge,
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
        rowsies: [],
        suite: "",
        chaseBridge: "",
      };

  if (params.id && !ticketData) {
    // invalid id
    return <p className="text-white">Invalid Ticket Id</p>;
  }

  // const [buttonText, setButtonText] = useState("Cancel");

  const [full_price, setFullPrice] = useState(
    defaultValues.seats.split(",").length * defaultValues.price || 0
  );
  const handleChangePrice = (e) => {
    const priceOneTicket = parseInt(e.target.value);
    const seats: string = document.getElementById("seats").value;
    const numberOfTickets = seats.split(",").length;
    const fullPrice = priceOneTicket * numberOfTickets;
    setFullPrice(fullPrice);
  };

  const handleSeatChange = (e) => {
    const seats = e.target.value;
    const numberOfSeats = seats.split(",").length;
    const price: number = parseInt(document.getElementById("price").value) || 0;
    const fullPrice = price * numberOfSeats;
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

  const [suite_cb, setSuiteCB] = useState(defaultValues.suite);

  //   const handleSuiteCB = (e) => {
  //     const sectionInfo = getSectionInfo(section);
  //     if (sectionInfo.suite) {
  //       setSuiteCB(e.target.checked);
  //     }
  //   };

  const [chaseBridge_cb, setChaseBridgeCB] = useState(
    defaultValues.chaseBridge
  );

  //   const handleChaseBridgeCB = (e) => {
  //     const sectionInfo = getSectionInfo(section);
  //     if (sectionInfo.chaseBridge) {
  //       setChaseBridgeCB(e.target.checked);
  //     }
  //   };

  const [section, setSection] = useState(defaultValues.section);
  const [rowsies, setRows] = useState(defaultValues.rowsies);
  const [row, setRow] = useState(defaultValues.row);
  const [seats, setSeats] = useState(defaultValues.seats);

  const handleChangeSection = (e) => {
    const section = e.target.value;
    setSection(section);
    // gets all the rows of the section
    const sectionInfo = getSectionRows(section);
    // console.log("SECTION INFO", sectionInfo);
    setRows(sectionInfo);
    const seats = getRowSeats(section);
    setSeats(seats);
    const sectionData = getSectionInfo(section);
    if (sectionData.suite) {
      setSuiteCB(true);
    } else {
      setSuiteCB(false);
    }
    if (sectionData.chaseBridge) {
      setChaseBridgeCB(true);
    } else {
      setChaseBridgeCB(false);
    }
  };

  const handleRowSelection = (e) => {
    setRow(e.target.value);
  };

  const availableSeats = `Available Seats (1-${seats})`;

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

      {/* <div className="grid justify-center items-center py-2">
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
          onChange={handleSeatChange}
        />
      </div> */}

      <div className="grid justify-center items-center py-2">
        <label htmlFor="name" className="text-white py-2 text-center">
          Choose Section
        </label>
        <select
          id="section"
          name="section"
          onChange={handleChangeSection}
          className="border-2 border-white rounded text-center w-80"
          defaultValue={section}
          required
        >
          {venue.map((section: SECTION) => {
            return (
              <option key={section.section} value={section.section}>
                {section.section}
              </option>
            );
          })}
        </select>
      </div>
      {/* <div className="grid justify-center items-center py-2">
        <a href={seatMap(section)} target="_blank" rel="noopener noreferrer">
          See Seats On Map
        </a>
      </div> */}

      <div className="grid justify-center items-center py-2">
        <label htmlFor="name" className="text-white py-2 text-center">
          Choose Row
        </label>
        <select
          id="row"
          name="row"
          onChange={handleRowSelection}
          className="border-2 border-white rounded text-center w-80"
          defaultValue={row}
          required
        >
          {rowsies.map((item: any) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      {/* <input
        type="text"
        id="seats"
        name="seats"
        placeholder={availableSeats}
        defaultValue={defaultValues.seats}
      />
      <label className="text-white text-center">
        Separate Seats With Comma (Example: 5,6,7,8)
      </label> */}

      <div className="grid justify-center items-center py-2">
        <label className="text-white text-center">Seats (1-{seats})</label>

        <input
          className="border-2 border-white rounded"
          type="text"
          id="seats"
          name="seats"
          required
          defaultValue={defaultValues.seats}
          placeholder={availableSeats}
          onChange={handleSeatChange}
        />
        <label htmlFor="seats" className="text-white py-2 text-center">
          Seats (Example: 1,2,3,4)
        </label>
      </div>

      <div className="flex justify-center items-center space-x-2 py-5">
        <input
          className="rounded"
          id="suite"
          type="checkbox"
          name="suite"
          value={suite_cb === true ? "true" : "false"}
          checked={suite_cb}
          disabled
        />
        <label htmlFor="opened-radio" className="text-white">
          Suite
        </label>
        <input
          type="hidden"
          name="suite"
          id="suite"
          defaultValue={suite_cb === true ? "true" : "false"}
        />
        <input
          id="chaseBridge"
          type="checkbox"
          name="chaseBridge"
          className="rounded"
          checked={chaseBridge_cb}
          value={chaseBridge_cb === true ? "true" : "false"}
          disabled
        />
        <label htmlFor="finished-radio" className="text-white">
          Chase Bridge
        </label>
        <input
          type="hidden"
          name="chaseBridge"
          id="chaseBridge"
          defaultValue={chaseBridge_cb === true ? "true" : "false"}
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
