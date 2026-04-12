import Spinner from "../others/Spinner.jsx";
import { useState } from "react";
import { useUserContext } from "../../hooks/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { apiLoginUser } from "../../../utils.js";
import FormButton from "../buttons/FormButton.jsx";
import ErrorMessage from "../formsComponents/errorMessage.jsx";

function Login() {
  const { login } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    setLoading(true);

    apiLoginUser("http://localhost:8000/api/users/login", {
      username,
      password,
    })
      .then((data) => {
        login(data);
        navigate("/");
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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4">Login</h1>
      <form
        action={handleLogin}
        className="flex flex-col gap-2 w-1/4 bg-stone-200 form-container"
      >
        <input
          type="text"
          name="username"
          placeholder="username"
          className="bg-stone-100 p-1"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-stone-100 p-1"
        />
        <FormButton text="Login" />
        <div className="flex flex-col gap-2 mt-2">
          {errors &&
            Object.entries(errors).map((error, index) => (
              <ErrorMessage key={index} error={error} />
            ))}
        </div>
      </form>
    </div>
  );
}

export default Login;
