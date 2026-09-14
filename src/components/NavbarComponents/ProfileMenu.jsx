import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { VscAccount, VscVerified } from "react-icons/vsc";

import routes from "../../router/routes";
import { UserContext } from "../../context/UserContext";
import { supabase } from "../../database/supabase";

function ProfileMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, signOut, profile } = useContext(UserContext);

  const [avatarUrl, setAvatarUrl] = useState();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  useEffect(() => {
    const downloadAvatar = async () => {

        //Ho aggiunto questo blocco in caso un utente non dovesse piu avere un avatar, lo stato verrebbe aggiornato 
      if (!profile?.avatar_url) {
        setAvatarUrl(undefined);
        return;
      }

      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar_url);

      if (error) {
        console.log("DOWNLOAD ERROR:", error);
        return;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    };

    downloadAvatar();
  }, [profile]);

  return (
    <div className="dropdown dropdown-end">
      {/* Trigger */}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        {user ? (
          avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Immagine di profilo"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <VscVerified className="text-3xl" />
          )
        ) : (
          <VscAccount className="text-3xl" />
        )}
      </div>

      {/* Dropdown */}
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        {user ? (
          <>
            {location.pathname !== routes.profile && (
              <li>
                <Link to={routes.profile}>Profilo</Link>
              </li>
            )}

            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={routes.register}>Registrati</Link>
            </li>

            <li>
              <Link to={routes.login}>Accedi</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileMenu;
