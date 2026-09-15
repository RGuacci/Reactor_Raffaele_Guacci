import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const handleData = async (user_data) => {
    await login({
      email: user_data.email,
      password: user_data.password,
    });

    navigate("/");
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(handleData)}>
        <h1 className="font-electro font-bold text-5xl text-center my-10">
          Accedi
        </h1>

        <fieldset className="fieldset bg-nav-gray border-base-300 rounded-box w-xs border p-4">
          <label className="label">Nome</label>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
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

          <button className="btn btn-primary mt-5">Accedi</button>
        </fieldset>
      </form>
    </main>
  );
}

export default Login;
