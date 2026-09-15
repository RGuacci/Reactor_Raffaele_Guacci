// :Loader dei giochi
export async function getAllGamesLoader() {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2026-01-01,2026-12-31&page_size=30`,
  );

  const data = await response.json();
 
  // Logica per i primi 5 giochi da mostrare nel carosello
  const carouselGames = await Promise.all(
    data.results.map(async (game) => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${game.id}/screenshots?key=${import.meta.env.VITE_API_KEY}`,
      );

      const data = await response.json();

      return {
        ...game,
        screenshot: data.results[0]?.image,
      };
    }),
  );

  return {
    games: data.results,
    carouselGames,
  };
}

// Loader per il filtro con ricerca
export async function getFilteredGames({ params }) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&search=${params.slug}`,
  );
  const data = await response.json();
  return data.results;
}

// Loader per i generi
export async function getAllGenres() {
  const response = await fetch(
    `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}`,
  );
  const data = await response.json();
  return data.results;
}

// Loader per il filtro dei generi
export async function getFilteredByGenres({ params }) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&genres=${params.slug}`,
  );
  const data = await response.json();
  return data.results;
}

// Loader per la pagina dettaglio
export async function getGameDetails({ params }) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=${import.meta.env.VITE_API_KEY}`,
  );
  const data = await response.json();
  return data;
}
