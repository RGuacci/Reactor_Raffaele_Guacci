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
    <header className="relative w-full mx-auto overflow-hidden">
      <img
        src={games[currentGame].screenshot}
        alt={games[currentGame].name}
        className="w-full h-64 md:h-80 object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex items-end justify-center">
        <div className="p-6 md:p-10">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center font-electro">
            {games[currentGame].name}
          </h1>
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
