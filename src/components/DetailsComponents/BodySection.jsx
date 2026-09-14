import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { supabase } from "../../database/supabase";

function BodySection({ game, profile_id }) {
  const [isFavourite, setIsFavourite] = useState(null);

  const [description, setDescription] = useState();
  const [gameReviews, setGameReviews] = useState();
  const [checkReview, setCheckReview] = useState(null);

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const getReviews = async () => {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select(
        `
      *,
      profiles (
        username,
        avatar_url
      )
    `,
      )
      .eq("game_id", game.id);

    setGameReviews(reviews);
  };

  const addReview = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        { profile_id, game_id: game.id, game_name: game.name, description },
      ])
      .select();

    setDescription("");
    setCheckReview(!checkReview);
  };

  const addGame = async () => {
    const { data, error } = await supabase
      .from("favourites")
      .insert([
        {
          profile_id,
          game_id: game.id,
          game_name: game.name,
        },
      ])
      .select();

    setIsFavourite(true);
  };

  const removeGame = async () => {
    const { errors } = await supabase
      .from("favourites")
      .delete()
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);
    setIsFavourite(false);
  };

  const getFavourites = async () => {
    let { data: favourites, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);
    if (favourites.length > 0) setIsFavourite(true);
  };

  useEffect(() => {
    getFavourites();
    getReviews();
  }, [checkReview]);

  return (
    <>
      {/* Preferito */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <div className="flex justify-end">
          {isFavourite ? (
            <FaHeart
              className="text-red-500 text-3xl cursor-pointer hover:scale-110 transition"
              onClick={removeGame}
            />
          ) : (
            <FaRegHeart
              className="text-red-500 cursor-pointer text-3xl hover:scale-110 transition"
              onClick={addGame}
            />
          )}
        </div>
      </section>

      {/* Recensioni */}
      <section className="max-w-6xl mx-auto px-4 mt-10 pb-10">
        {/* Scrivi recensione */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-box p-5 md:p-6">
          <h2 className="text-white text-xl font-bold mb-5">
            Scrivi una recensione
          </h2>

          <textarea
            className="textarea w-full min-h-32"
            placeholder="Scrivi la tua recensione!"
            onChange={handleDescription}
            value={description}
          />

          <button
            className="btn bg-nav-gray mt-4 w-full sm:w-auto"
            onClick={addReview}
          >
            Invia
          </button>
        </div>

        {/* Lista recensioni */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-box p-5 md:p-6 mt-6">
          <h2 className="text-white text-xl font-bold mb-5">Recensioni</h2>

          {gameReviews?.map((review) => (
            <div className="border border-white/10 rounded-box p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                {/* Avatar */}
                {/* <img
      className="w-10 h-10 rounded-full"
      src={...}
      alt="Avatar"
    /> */}

                {/* Username */}
                <p className="text-white font-bold">
                  {review.profiles?.username}
                </p>
              </div>

              {/* Recensione */}
              <p className="text-white/80">{review.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default BodySection;
