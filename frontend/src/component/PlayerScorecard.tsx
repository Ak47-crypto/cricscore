import React from 'react';

const PlayerScorecard: React.FC = () => {
  return (
    <div className="border p-4 rounded-lg space-y-4">
      <h3 className="text-lg font-bold">Player Scorecard</h3>

      {/* Batsmen */}
      <div>
        <h4 className="font-bold">Batsman</h4>
        <p>Player 1 Name + Runs</p>
        <p>Player 2 Name + Runs</p>
        <p>Player 3 Name + Runs</p>
      </div>

      {/* Bowlers */}
      <div>
        <h4 className="font-bold">Bowler</h4>
        <p>Player 1 Name + Runs + Overs + Maidens</p>
        <p>Player 2 Name + Runs + Overs + Maidens</p>
      </div>
    </div>
  );
};

export default PlayerScorecard;
