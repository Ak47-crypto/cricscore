import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/SiteContext';
interface IBatsMan{
  striker:{
    runs:number
  },
  nonStriker:{
    runs:number
  }
}
const PlayerScorecard: React.FC = () => {
  const [batsManStat,setBatsManStat]=useState<IBatsMan>({
    striker:{
      runs:0
    },
    nonStriker:{
      runs:0
    }
  })
  const [bowlerStat,setBowlerStat]=useState<{wickets:number}>({wickets:0})
  const {strikerContext,nonStrikerContext,bowlerContext,matchState}=useAppContext();

useEffect(()=>{
  const FetchBatsmanStats = async ()=>{
    // bowler
    const response2 = await fetch("http://localhost:3000/api/fetchPlayerRun", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          playerId:bowlerContext,
          playerType:"bowler"
        },
      }),
    });
    const data2 = await response2.json();
    if(data2.statusCode===200){
     setBowlerStat(data2.data)
    }
  }
  FetchBatsmanStats()
},[bowlerContext,matchState])

  useEffect(()=>{
    const FetchBatsmanStats = async ()=>{
      // nonStriekr
      const response2 = await fetch("http://localhost:3000/api/fetchPlayerRun", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            playerId:nonStrikerContext,
            playerType:"batsman"
          },
        }),
      });
      const data2 = await response2.json();
      if(data2.statusCode===200){
        setBatsManStat((prev)=>({
          ...prev,
          nonStriker:{
            runs:data2.data.runs
          }
        }))
      }
    }
    FetchBatsmanStats()
  },[nonStrikerContext,matchState])

  useEffect(()=>{
    console.log(strikerContext);
    
    const FetchBatsmanStats = async () =>{
      const response = await fetch("http://localhost:3000/api/fetchPlayerRun", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            playerId:strikerContext,
            playerType:"batsman"
          },
        }),
      });
      const data = await response.json();
      if(data.statusCode===200){
        setBatsManStat((prev)=>({
          ...prev,
          striker:{
            runs:data.data.runs
          }
        }))
      }
      
    }
    FetchBatsmanStats();
  },[strikerContext,matchState])
  return (
    <div className="border p-4 rounded-lg space-y-4">
      <h3 className="text-lg font-bold">Player Scorecard</h3>

      {/* Batsmen */}
      <div>
        <h4 className="font-bold">Batsman</h4>
        <p>Striker Runs: {batsManStat?.striker.runs}</p>
        <p>Non-Striker Runs: {batsManStat?.nonStriker.runs}</p>
      </div>

      {/* Bowlers */}
      <div>
        <h4 className="font-bold">Bowler</h4>
        <p>Bowler wicket: {bowlerStat?.wickets}</p>
      </div>
    </div>
  );
};

export default PlayerScorecard;
