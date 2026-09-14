import { Link } from "react-router";

function GameCard({ game }) {
  return (
    <>
      <div className="aspect-video overflow-hidden relative">
        <Link to={`details/${game.id}`}>
          <img
            src={`${game.background_image}`}
            className="w-full h-full brightness-50"
            alt="An image of the game in the card"
          />
        </Link>
        <p className="absolute bottom-px w-full text-center text-white">
          {game.name}
        </p>
      </div>
    </>
  );
}

export default GameCard;
