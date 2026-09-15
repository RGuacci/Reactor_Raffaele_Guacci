import { useEffect, useState } from "react";
import { supabase } from "../../database/supabase";
import Avatar from "./Avatar";

function Reviews({ game, profile_id }) {
  const [description, setDescription] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [checkReview, setCheckReview] = useState(false);

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
        {
          profile_id,
          game_id: game.id,
          game_name: game.name,
          description,
        },
      ])
      .select();

    setDescription("");
    setCheckReview(!checkReview);
  };

  useEffect(() => {
    getReviews();
  }, [checkReview]);

  return (
    <section className="max-w-6xl mx-auto px-4 mt-10 pb-10">
      {/* Scrivi recensione */}
      {profile_id && (
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-box p-5 md:p-6">
          <h2 className="text-white text-xl font-bold mb-5">
            Scrivi una recensione
          </h2>

          <textarea
            className="textarea w-full min-h-32 bg-base-300 text-base-content"
            placeholder="Scrivi la tua recensione!"
            onChange={handleDescription}
            value={description}
          />

          <button
            className="btn btn-primary mt-4 w-full sm:w-auto"
            onClick={addReview}
          >
            Invia
          </button>
        </div>
      )}

      {/* Lista recensioni */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-box p-5 md:p-6 mt-6">
        <h2 className="text-white text-xl font-bold mb-5">Recensioni</h2>

        {gameReviews?.map((review) => (
          <div
            key={review.id}
            className="border border-white/10 rounded-box p-4 mb-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar
                avatarPath={review.profiles?.avatar_url}
                alt={review.profiles?.username}
              />

              <p className="text-white font-bold">
                {review.profiles?.username}
              </p>
            </div>

            <p className="text-white/80">{review.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
