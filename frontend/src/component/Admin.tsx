import React, { useEffect, useState } from "react";
import CommentaryButtons from "./CommentryButton";
import TeamScorecard from "./TeamScorecard";
import PlayerScorecard from "./PlayerScorecard";
import {  IApiResponsePlayer, IMatch, IPlayer } from "../Types/DataTypes";

const App: React.FC = () => {
    const [players,setPlayers]=useState<IApiResponsePlayer>()
    const [matchData,setMatchData]=useState<IMatch>()

  useEffect(() => {
    const MatchId = localStorage.getItem('matchId');
    const parseMatchId = JSON.parse(MatchId as string)
    setMatchData(parseMatchId)
    console.log(parseMatchId)
    const FetchPlayers=async()=>{
        const response = await fetch("http://localhost:3000/api/fetchPlayer", {
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
        console.log(data);
        
    }
     FetchPlayers();
  }, []);
  return localStorage.getItem("matchId") ? (
    <div className="container mx-auto p-4 grid grid-cols-2 gap-4">
      {/* Commentary Buttons Section */}
      <CommentaryButtons data={players?.data} matchData={matchData} />

      {/* Scorecards Section */}
      <div className="grid grid-rows-2 gap-4">
        <TeamScorecard matchDetail={matchData}/>
        <PlayerScorecard />
      </div>
    </div>
  ) : (
    <h1>no match id provided</h1>
  );
};

export default App;
