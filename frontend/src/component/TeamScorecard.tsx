import React, { useEffect } from 'react';
import { IMatch } from '../Types/DataTypes';
interface MatchButtonsProps {
  matchDetail:IMatch | undefined
}
const TeamScorecard: React.FC<MatchButtonsProps> = ({matchDetail}) => {

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-bold">Match Scorecard</h3>
      <div className="mt-4">
        <p>Match Name: {matchDetail?.name}</p>
        <p>Teams : {matchDetail?.team[0]}</p>
        <p>Runs : {matchDetail?.runs?matchDetail.runs:0}</p>
        <p>Balls : {matchDetail?.ball?Math.floor(matchDetail.ball/6):0}</p>
        <p>Wide: 0 Noball: 0 Legbye: 0 Bye: 0</p>
      </div>
    </div>
  );
};

export default TeamScorecard;
