import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import routes from "../../router/routes";
import { supabase } from "../../database/supabase";
import AvatarForm from "../../components/ProfileComponents/AvatarForm";

function ProfileSettings() {
  const { profile, getUser, updateProfile } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleSettings = async (data) => {
    updateProfile(data);
    navigate(routes.profile);
  };

  return (
    <>
      <main className="min-h-screen px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-electro font-bold text-4xl md:text-5xl text-center mb-10">
            Aggiorna profilo
          </h1>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
            {/* Dati personali */}
            <form onSubmit={handleSubmit(handleSettings)}>
              <fieldset className="fieldset bg-nav-gray border-base-300 rounded-box w-full sm:w-80 border p-4">
                <label className="label">Nome</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Mario"
                  {...register("first_name", {
                    required: "Il nome è obbligatorio",
                  })}
                />

                {errors.first_name && (
                  <p className="text-red-500">{errors.first_name.message}</p>
                )}

                <label className="label">Cognome</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Rossi"
                  {...register("last_name", {
                    required: "Il cognome è obbligatorio",
                  })}
                />

                {errors.last_name && (
                  <p className="text-red-500">{errors.last_name.message}</p>
                )}

                <label className="label">Username</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Mario.Rossi"
                  {...register("username", {
                    required: "Lo username è obbligatorio",
                  })}
                />

                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}

                <button className="btn btn-neutral mt-4 w-full">
                  Modifica
                </button>
              </fieldset>
            </form>

            <AvatarForm />
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfileSettings;
