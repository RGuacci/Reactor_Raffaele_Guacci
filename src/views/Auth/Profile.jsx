import { useContext, useEffect, useState } from "react";
import Ryu from "../../assets/Ryu.jpg";
import { UserContext } from "../../context/UserContext";
import routes from "../../router/routes";
import { Link } from "react-router";
import { supabase } from "../../database/supabase";

function Profile() {
  const { user, profile } = useContext(UserContext);

  const [avatarUrl, setAvatarUrl] = useState();

  const [userFavourites, setUserFavourites] = useState();

  const downloadAvatar = async () => {
    if (profile && profile.avatar_url) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar_url);
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    }
  };

  const getFavourites = async () => {
    if (profile) {
      let { data: favourites, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", profile.id);
      setUserFavourites(favourites);
    }
  };

  useEffect(() => {
    downloadAvatar();
    getFavourites();
  }, [profile]);

  return (
    <main className="min-h-screen px-4 py-10">
      {user && profile && (
        <div className="max-w-5xl mx-auto">
          <article className="flex flex-col items-center mb-10">
            <img
              src={avatarUrl ?? Ryu}
              className="w-25 h-25 rounded-full"
              alt="Immagine di Profilo"
            />

            <h2 className="text-2xl font-bold mt-5">{profile.first_name}</h2>
          </article>

          <section className="max-w-2xl mx-auto">
            <article className="bg-base-300 rounded-box p-6 md:p-8">
              <h3 className="font-bold text-xl mb-5">I Tuoi Dati</h3>

              <div className="space-y-2">
                <p>
                  <span className="font-bold">Nome:</span> {profile.first_name}{" "}
                  {profile.last_name}
                </p>

                <p>
                  <span className="font-bold">Username:</span>{" "}
                  {profile.username}
                </p>

                <p className="break-all">
                  <span className="font-bold">Email:</span> {user.email}
                </p>
              </div>

              <Link
                className="btn btn-outline mt-5"
                to={routes.profile_settings}
              >
                Impostazioni
              </Link>
            </article>
          </section>

          <section className="max-w-6xl mx-auto mt-10 my-10">
            <h2 className="text-2xl font-bold mb-5 text-center">
              I tuoi preferiti
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {userFavourites?.map((game) => (
                <div
                  className="group bg-base-300 rounded-box p-5 transition-all duration-300 hover:bg-base-200 hover:shadow-[0_0_15px_rgba(124,58,237,0.25)]"
                  key={game.id}
                >
                  <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-primary">
                    {game.game_name}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Profile;
