import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { supabase } from "../../database/supabase";

function AvatarForm() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const { profile, getUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  }, [file]);

  const handleAvatar = async (e) => {
    e.preventDefault();

    const fileExt = file.name.split(".").pop();
    const fileName = `${profile.id}${Math.random()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: profile.id,
        avatar_url: fileName,
      })
      .select();

    await getUser();
  };

  return (
    <>
      <form
        className="bg-nav-gray border-base-300 rounded-box w-xs border p-4"
        onSubmit={handleAvatar}
      >
        <input
          type="file"
          className="file-input file-input-lg w-full mb-5"
          onChange={handleChange}
        />

        <button className="btn btn-neutral mt-4">Carica Avatar</button>
      </form>

      <img src={preview} className="w-50" />
    </>
  );
}

export default AvatarForm;
