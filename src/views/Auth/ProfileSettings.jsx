import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import routes from "../../router/routes";
import AvatarForm from "../../components/ProfileComponents/AvatarForm";

function ProfileSettings() {
  const { updateProfile } = useContext(UserContext);

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
             <fieldset className="bg-base-300 rounded-box p-6 md:p-8 w-full sm:w-80 min-h-100">
                <label className="label">Nome</label>
                <input
                  type="text"
                 className="input w-full bg-base-100"
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
                 className="input w-full bg-base-100"
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
                 className="input w-full bg-base-100"
                  placeholder="Mario.Rossi"
                  {...register("username", {
                    required: "Lo username è obbligatorio",
                  })}
                />

                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}

                <button className="btn btn-primary mt-4 w-full">
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
