import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState ,useEffect } from "react";
import { supabase } from "../../database/supabase";

function BodySection({ game, profile_id }) {

  const [isFavourite, setIsFavourite] = useState(null);

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

  const getFavourites = async() => {
    let { data:favourites ,error } = await supabase
    .from('favourites')
    .select('*')
    .eq('profile_id' ,profile_id)
    .eq('game_id' ,game.id)
    if(favourites.length > 0) setIsFavourite(true);
  };

  useEffect(
    () => {
      getFavourites()
    } , []
  )

  return (
    <section className="max-w-6xl mx-auto px-4 mt-20 pb-10">
      <div className="flex justify-end mb-4">
        {isFavourite ? (
          <FaHeart className="text-red-500 text-3xl" onClick={removeGame} />
        ) : (
          <FaRegHeart
            className="text-red-500 cursor-pointer text-3xl hover:scale-110 transition"
            onClick={addGame}
          />
        )}
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-box p-5 md:p-6">
        <h2 className="text-white text-xl font-bold mb-5">Recensioni</h2>

        <textarea
          className="textarea w-full"
          placeholder="Scrivi la tua recensione!"
        />
      </div>
    </section>
  );
}

export default BodySection;
