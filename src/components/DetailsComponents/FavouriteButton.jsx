import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { supabase } from "../../database/supabase";

function FavouriteButton({ game, profile_id }) {
  const [isFavourite, setIsFavourite] = useState(false);

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
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);

    setIsFavourite(false);
  };

  const getFavourites = async () => {
    if (!profile_id) return;

    const { data: favourites, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);

    if (favourites.length > 0) {
      setIsFavourite(true);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  if (!profile_id) return null;

  return (
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
  );
}

export default FavouriteButton;