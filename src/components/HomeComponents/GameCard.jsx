import { Link } from "react-router";

function GameCard({ game }) {
  return (
    <div className="card bg-base-100 shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.45)]">
      <Link to={`/details/${game.id}`}>
        <figure className="relative overflow-hidden">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full aspect-video object-cover brightness-80 transition-transform duration-500 hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        </figure>

        <div className="card-body p-3 md:p-4">
          <h2 className="card-title text-base md:text-lg">{game.name}</h2>
        </div>
      </Link>
    </div>
  );
}

export default GameCard;
