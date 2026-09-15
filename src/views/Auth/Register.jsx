import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { signUp } = useContext(UserContext);

  const handleData = async (user_data) => {
    await signUp({
      email: user_data.email,
      password: user_data.password,
      options: {
        data: {
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          username: user_data.username,
        },
      },
    });

    navigate("/");
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(handleData)}>
        <h1 className="font-electro text-center font-bold my-10 text-5xl">
          Registrati
        </h1>

        <fieldset className="fieldset bg-nav-gray border-base-300 rounded-box w-xs border p-4">
          <label className="label">Nome</label>
          <input
            type="text"
            className="input"
            placeholder="Mario"
            {...register("first_name", {
              required: "Il nome è obbligatorio",
            })}
          />
          {errors.first_name && (
            <p className="text-red-500">{errors.fisrt_name.message}</p>
          )}

          <label className="label">Cognome</label>
          <input
            type="text"
            className="input"
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
            className="input"
            placeholder="Mario.Rossi"
            {...register("username", {
              required: "Il cognome è obbligatorio",
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="mariorossi@gmail.com"
            {...register("email", { required: "La mail è obbligatoria" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            {...register("password", {
              required: "La password è obbligatoria",
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button className="btn btn-primary mt-5">Registrati</button>
        </fieldset>
      </form>
    </main>
  );
}

export default Register;
