import { useEffect, useState } from "react";

function HeaderHome({ games }) {
  const [currentGame, setCurrentGame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGame((current) => {
        return (current + 1) % games.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [games]);

  if (!games || games.length === 0) {
    return null;
  }

  return (
    <header className="relative w-full overflow-hidden">
      <img
        src={games[currentGame].background_image}
        alt={games[currentGame].name}
        className="w-full h-64 md:h-96 object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end">
        <div className="p-6 md:p-10">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            {games[currentGame].name}
          </h1>
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
