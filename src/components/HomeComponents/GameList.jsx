import GameCard from "./GameCard";

function GameList({ children }) {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </main>
  );
}

GameList.Card = GameCard;

export default GameList;
