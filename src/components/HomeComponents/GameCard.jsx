import { Link } from "react-router";

function GameCard({ game }) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <Link to={`details/${game.id}`}>
        <figure>
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full aspect-video object-cover brightness-50 rounded-t-box"
          />
        </figure>

        <div className="card-body p-3 md:p-4">
          <h2 className="card-title text-base md:text-lg">{game.name}</h2>
        </div>
      </Link>
    </div>
  );
}

export default GameCard;
