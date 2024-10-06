import React from 'react';

const TeamScorecard: React.FC = () => {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-bold">Team Scorecard</h3>
      <div className="mt-4">
        <p>Static Team Name</p>
        <p>Runs / Wickets</p>
        <p>Balls & Overs</p>
        <p>Wide: 0 Noball: 0 Legbye: 0 Bye: 0</p>
      </div>
    </div>
  );
};

export default TeamScorecard;
