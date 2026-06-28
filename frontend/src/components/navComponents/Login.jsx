import Spinner from "../others/Spinner.jsx";
import { useState } from "react";
import { useUserContext } from "../../hooks/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { apiLoginUser } from "../../../utils.js";
import { Link } from "react-router-dom";
import FormButton from "../buttons/FormButton.jsx";
import ErrorMessage from "../formsComponents/errorMessage.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
  const { login } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    setLoading(true);

    apiLoginUser(`${BASE_URL}/api/users/login`, {
      username,
      password,
    })
      .then((data) => {
        login(data);
        data.user.staff ? navigate("/admin") : navigate("/");
      })
      .catch((resErrors) => {
        const formattedErrors = {};

        Object.entries(resErrors).forEach(([key, value]) => {
          formattedErrors[key] = Array.isArray(value) ? value[0] : value;
        });

        setErrors(formattedErrors);

        navigate("/auth/login");
      })
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <form
        action={handleLogin}
        className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/4 bg-stone-200 form-container"
      >
        <input
          type="text"
          name="username"
          placeholder="username"
          className="bg-stone-100 p-1 pl-2 rounded-md focus:outline-black focus:outline-2"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-stone-100 p-1 pl-2 rounded-md focus:outline-black focus:outline-2"
        />
        <FormButton text="Login" />
        <div className="flex flex-col gap-2 mt-2">
          {errors &&
            Object.entries(errors).map((error, index) => (
              <ErrorMessage key={index} error={error} />
            ))}
        </div>
        <p className="text-zinc-500 text-xs text-center">
          Forgot your password?{" "}
          <Link className="hover:text-zinc-800" to={"/auth/password-reset"}>
            Reset here!
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
