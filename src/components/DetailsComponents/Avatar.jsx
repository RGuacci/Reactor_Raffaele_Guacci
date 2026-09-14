import { useEffect, useState } from "react";
import { supabase } from "../../database/supabase";
import Ryu from "../../assets/Ryu.jpg";

function Avatar({ avatarPath, alt = "Avatar" }) {
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    let objectUrl;

    const downloadAvatar = async () => {
      if (!avatarPath) {
        setAvatarUrl(undefined);
        return;
      }

      const { data, error } = await supabase.storage
        .from("avatars")
        .download(avatarPath);

      if (error || !data) {
        setAvatarUrl(undefined);
        return;
      }

      objectUrl = URL.createObjectURL(data);
      setAvatarUrl(objectUrl);
    };

    downloadAvatar();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [avatarPath]);

  return (
    <img
      src={avatarUrl ?? Ryu}
      alt={alt}
      className="w-10 h-10 rounded-full object-cover"
    />
  );
}

export default Avatar;