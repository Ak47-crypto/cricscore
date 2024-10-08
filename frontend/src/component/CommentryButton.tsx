import React, { useEffect, useState } from "react";
import { IBall, IMatch, IPlayer } from "../Types/DataTypes";

interface CommentaryButtonsProps {
  data: { currentBat: IPlayer[]; currentBall: IPlayer[] } | undefined;
  matchData: IMatch | undefined;
}
interface IExtra {
  wide: boolean;
  noBall: boolean;
  byes: boolean;
  legByes: boolean;
  overthrow: boolean;
}

const CommentaryButtons: React.FC<CommentaryButtonsProps> = ({
  data,
  matchData,
}) => {
  const [striker, setStriker] = useState<string>("");
  const [nonStriker, setNonStriker] = useState<string>("");
  const [bowler, setBowler] = useState<string>("");

  const [ballData, setBallData] = useState<IBall>({
    runs: 0,
    extras: {
      wide: false,
      noBall: false,
      byes: false,
      legByes: false,
      overthrow: false,
    },
    isLegal: true,
    wicket: false,
    batsman: striker,
    bowler: bowler,
    match: matchData?._id ? matchData._id : "",
  });

  const handleClickRun = (run: number) => {
    setBallData((prev) => ({
      ...prev,
      runs: run,
      extras: {
        wide: false,
        noBall: false,
        byes: false,
        legByes: false,
        overthrow: false,
      },
      isLegal: true,
      batsman: striker,
      bowler: bowler,
    }));
  };

  const handleExtraClick = (extra: keyof IExtra) => {
    setBallData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extra]: !prev.extras[extra],
      },
      isLegal: extra === "wide" || extra === "noBall" ? false : true,
      runs:extra === "wide" || extra === "noBall" ? 1 : 0,
      batsman: striker,
      bowler: bowler,
    }));
    console.log(ballData);
  };

  const handleWicketClick = () => {
    setBallData((prev) => ({
      ...prev,
      wicket: true,
      extras: {
        wide: false,
        noBall: false,
        byes: false,
        legByes: false,
        overthrow: false,
      },
      isLegal: true,
      batsman: striker,
      bowler: bowler,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="space-y-4">
      {/* Striker and Non-Striker Dropdowns */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="striker" className="block font-medium mb-1">
            Striker
          </label>
          <select
            id="striker"
            className="border p-2 w-full"
            name="striker"
            onChange={(e) => setStriker(e.target.value)}
          >
            <option value="">Select Striker</option>
            {data?.currentBat.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="nonStriker" className="block font-medium mb-1">
            Non-Striker
          </label>
          <select
            id="nonStriker"
            className="border p-2 w-full"
            name="nonStriker"
            onChange={(e) => setNonStriker(e.target.value)}
          >
            <option value="">Select Non-Striker</option>
            {data?.currentBat.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="nonStriker" className="block font-medium mb-1">
            Bowler
          </label>
          <select
            id="nonStriker"
            className="border p-2 w-full"
            name="nonStriker"
            onChange={(e) => setBowler(e.target.value)}
          >
            <option value="">Select Bowler</option>
            {data?.currentBall.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons for runs */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-4">
          {[0, 1, 2, 3, 4, 6].map((run) => (
            <button
              key={run}
              type="button"
              className="border p-4"
              onClick={() => handleClickRun(run)}
            >
              {run}
            </button>
          ))}
          <button className="border p-4">Wicket</button>
        </div>

        {/* Extras */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <button
            className="border p-4"
            onClick={() => handleExtraClick("wide")}
          >
            Wide
          </button>
          <button
            className="border p-4"
            onClick={() => handleExtraClick("noBall")}
          >
            Noball
          </button>
          <button
            className="border p-4"
            onClick={() => handleExtraClick("byes")}
          >
            Bye
          </button>
          <button
            className="border p-4"
            onClick={() => handleExtraClick("legByes")}
          >
            Legbye
          </button>
        </div>
        <button className="border p-4 text-center w-full mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentaryButtons;
