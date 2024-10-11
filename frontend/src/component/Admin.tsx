import React, { useEffect, useState } from "react";
import CommentaryButtons from "./CommentryButton";
import TeamScorecard from "./TeamScorecard";
import PlayerScorecard from "./PlayerScorecard";
import {  IApiResponsePlayer } from "../Types/DataTypes";

const App: React.FC = () => {
    const [players,setPlayers]=useState<IApiResponsePlayer>()
  useEffect(() => {
    const MatchId = localStorage.getItem('matchId');
    const parseMatchId = JSON.parse(MatchId as string)
    const FetchPlayers=async()=>{
      try {
        const response = await fetch("https://cricscore-eosin.vercel.app/api/fetchPlayer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              ...parseMatchId,
            },
          }),
        });
        
      const data:IApiResponsePlayer = await response.json();
      if(data.statusCode===200){
          setPlayers(data)
      }
      } catch (error) {
        console.log(error)
      }
    }
     FetchPlayers();
  }, []);
  return localStorage.getItem("matchId") ? (
    <div className="container mx-auto p-4 grid grid-cols-2 gap-4">
      {/* Commentary Buttons Section */}
      <CommentaryButtons data={players?.data} />

      {/* Scorecards Section */}
      <div className="grid grid-rows-2 gap-4">
        <TeamScorecard/>
        <PlayerScorecard />
      </div>
    </div>
  ) : (
    <h1>no match id provided</h1>
  );
};

export default App;
