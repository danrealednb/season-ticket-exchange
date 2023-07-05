import { Form, useSearchParams, useNavigate } from "@remix-run/react";
import { GAME, schedule, getRemainingSchedule } from "~/data/schedule";
import { useState } from "react";

function TicketFilter({ path }) {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const selectedValue = params.get("query");

  const [game, setGame] = useState(
    selectedValue || getRemainingSchedule()[0].game.toString()
  );
  const handleChangeGame = (e) => {
    const gameS = e.target.value;
    setGame(gameS);
  };

  const handleChange = () => {
    document.getElementById("query").value =
      getRemainingSchedule()[0].game.toString();
    params.delete("filter");
    navigate(path);
  };

  return (
    <>
      <div className="flex justify-center pt-5 space-x-2 items-center">
        <Form className="flex space-x-2">
          <select
            id="query"
            name="query"
            className="border-2 border-white rounded text-center w-64"
            defaultValue={game}
            onChange={handleChangeGame}
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

          <button className="text-white border-2 rounded px-1">Search</button>
        </Form>
        {params.get("query") && (
          <button
            id="clearBtn"
            name="clearBtn"
            className="text-white border-2 rounded px-1"
            onClick={handleChange}
          >
            Clear
          </button>
        )}
      </div>
    </>
  );
}

export default TicketFilter;
