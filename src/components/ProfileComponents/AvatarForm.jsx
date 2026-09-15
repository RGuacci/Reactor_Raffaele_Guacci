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
    <form
      className="bg-base-300 rounded-box p-6 md:p-8 w-full sm:w-80 min-h-100"
      onSubmit={handleAvatar}
    >
      <h2 className="font-bold text-xl mb-5">Immagine profilo</h2>

      {preview && (
        <img
          src={preview}
          alt="Anteprima avatar"
          className="w-40 h-40 object-cover rounded-full mx-auto mb-5"
        />
      )}

      <input
        type="file"
        className="file-input file-input-lg w-full mb-5"
        onChange={handleChange}
      />

      <button className="btn btn-primary mt-4 w-full">Carica Avatar</button>
    </form>
  );
}

export default AvatarForm;
