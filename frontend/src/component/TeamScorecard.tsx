import React, { useEffect } from 'react';
import { IMatch } from '../Types/DataTypes';
import { useAppContext } from '../context/SiteContext';
interface MatchButtonsProps {
  matchDetails:IMatch | undefined
}
const TeamScorecard: React.FC<MatchButtonsProps> = ({matchDetails}) => {
  const {matchContextData}=useAppContext()
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-bold">Match Scorecard</h3>
      <div className="mt-4">
        <p>Match Name: {matchContextData?.name}</p>
        <p>Teams : {matchContextData?.team[0]}</p>
        <p>Runs : {matchContextData?.runs?matchContextData.runs:0}</p>
        <p>Overs : {matchContextData?.ball?Math.floor(matchContextData.ball/6):0}.{matchContextData?.ball?matchContextData.ball%6:""}</p>
        <p>Wide: 0 Noball: 0 Legbye: 0 Bye: 0</p>
      </div>
    </div>
  );
};

export default TeamScorecard;
