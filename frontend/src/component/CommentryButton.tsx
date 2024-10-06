import React from 'react';

interface Player {
    _id:string;
    name:string;
    team:string;
}

interface CommentaryButtonsProps {
  players: Player[];
}

const CommentaryButtons: React.FC<CommentaryButtonsProps> = ({ players }) => {
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
          >
            <option value="">Select Striker</option>
            {players.map((player) => (
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
          >
            <option value="">Select Non-Striker</option>
            {players.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons for runs */}
      <div className="grid grid-cols-4 gap-4">
        <button className="border p-4">0</button>
        <button className="border p-4">1</button>
        <button className="border p-4">2</button>
        <button className="border p-4">3</button>
        <button className="border p-4">4</button>
        <button className="border p-4">6</button>
        <button className="border p-4">Wicket</button>
      </div>

      {/* Extras */}
      <div className="grid grid-cols-2 gap-4">
        <button className="border p-4">Wide</button>
        <button className="border p-4">Noball</button>
        <button className="border p-4">Bye</button>
        <button className="border p-4">Legbye</button>
      </div>

      {/* New Ball */}
      <div>
        <button className="border p-4 w-full">New Ball</button>
      </div>
    </div>
  );
};

export default CommentaryButtons;
