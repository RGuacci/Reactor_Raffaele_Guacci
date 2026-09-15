function Header({ game }) {
  return (
    <header className="pt-10 text-white px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-electro text-center mb-2 font-bold drop-shadow-lg">
          {game.name}
        </h1>

        <h2 className="text-center font-electro text-xl mb-8 text-white">
          Rilasciato il <span className="font-bold">{game.released}</span>
        </h2>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <article className="bg-white/10 backdrop-blur-md rounded-box p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Descrizione</h3>

            <p className="leading-relaxed text-white">{game.description_raw}</p>
          </article>

          <article className="flex flex-col items-center gap-5">
            <div className="badge bg-base-300 text-yellow-400 text-lg p-5">
              ★ {game.rating}
            </div>

            <div>
              <h3 className="text-xl font-bold text-center mb-3 text-white">Generi</h3>

              <div className="flex justify-center gap-2 flex-wrap">
                {game.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="badge badge-primary font-bold mb-10 text-white px-5"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </section>
      </div>
    </header>
  );
}

export default Header;
