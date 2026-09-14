import GameCard from './GameCard';

function GameList ({ children }){
  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {children}
      </main>
    </>
  )
}

GameList.Card = GameCard;

export default GameList;