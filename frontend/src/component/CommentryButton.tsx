import React, { useContext, useEffect, useState } from "react";
import { IBall, IMatch, IPlayer } from "../Types/DataTypes";
import { useAppContext } from "../context/SiteContext";

interface CommentaryButtonsProps {
  data: { currentBat: IPlayer[]; currentBall: IPlayer[] } | undefined;
}
interface IExtra {
  wide: boolean;
  noBall: boolean;
  byes: boolean;
  legByes: boolean;
  overthrow: boolean;
}

const CommentaryButtons: React.FC<CommentaryButtonsProps> = ({
  data
}) => {
  const [striker, setStriker] = useState<string>("");
  const [nonStriker, setNonStriker] = useState<string>("");
  const [bowler, setBowler] = useState<string>("");
  const [buttonClick, setButtonClick] = useState<boolean>(false);
  const {matchContextData,setMatchContextData,setStrikerContext,setNonStrikerContext,setBowlerContext,setMatchState}=useAppContext()
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
    match: matchContextData ? matchContextData._id : "",
  });

  const handleClickRun = (run: number) => {
    setButtonClick(true);
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
      match: matchContextData ? matchContextData._id : "",
    }));
  };

  const handleExtraClick = (extra: keyof IExtra) => {
    setButtonClick(true);
    setBallData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extra]: !prev.extras[extra],
      },
      isLegal: extra === "wide" || extra === "noBall" ? false : true,
      runs: extra === "wide" || extra === "noBall" ? 1 : 0,
      batsman: striker,
      bowler: bowler,
      match: matchContextData ? matchContextData._id : "",
    }));
    console.log(ballData);
  };

  const handleWicketClick = () => {
    setButtonClick(true);
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
      match: matchContextData ? matchContextData._id : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonClick(false);
    try {
      const response = await fetch("http://localhost:3000/api/createBall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...ballData,
          },
        }),
      });
      const data = await response.json();
      if (data.statusCode === 200) {
        const response2 = await fetch("http://localhost:3000/api/fetchMatch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              matchId:matchContextData?._id,
            },
          }),
        });
        const data2 = await response2.json();
        if(data2.statusCode ===200){
          const parsedData = JSON.stringify(data2.data)
          console.log(parsedData,"in comm");
          setMatchContextData(data2.data)
          setMatchState((prev: number) => prev + 1);
          localStorage.setItem('matchId',parsedData)

        }
        setBallData({
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
          match: matchContextData ? matchContextData._id : "",
        });
        alert("Successfully saved");
      }
      console.log(data);
    } catch (error) {}
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
            onChange={(e) => {setStriker(e.target.value); setStrikerContext(e.target.value)}}
            
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
            onChange={(e) => {setNonStriker(e.target.value); setNonStrikerContext(e.target.value)}}
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
            onChange={(e) => {setBowler(e.target.value); setBowlerContext(e.target.value)}}
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
              disabled={buttonClick}
            >
              {run}
            </button>
          ))}
          <button
            className="border p-4"
            onClick={handleWicketClick}
            disabled={buttonClick}
          >
            Wicket
          </button>
        </div>

        {/* Extras */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <button
            className="border p-4"
            onClick={() => handleExtraClick("wide")}
            disabled={buttonClick}
          >
            Wide
          </button>
          <button
            className="border p-4"
            onClick={() => handleExtraClick("noBall")}
            disabled={buttonClick}
          >
            Noball
          </button>
          <button
            className="border p-4"
            onClick={() => handleExtraClick("byes")}
            disabled={buttonClick}
          >
            Bye
          </button>
          <button
            className="border p-4"
            onClick={() => handleExtraClick("legByes")}
            disabled={buttonClick}
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
