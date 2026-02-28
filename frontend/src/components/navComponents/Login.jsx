import Spinner from "../others/Spinner.jsx";
import { useState } from "react";
import { useUserContext } from "../../hooks/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { apiLoginUser } from "../../../utils.js";

function Login() {
  const { login } = useUserContext();
  const [loading, setLoading] = useState(false);
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
      .catch(() => {
        console.error("Login failed! Check credentials.");
        // to implement Toast or something for UI messages
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
        className="flex flex-col gap-2 w-1/4 bg-stone-200 p-2"
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
        <button type="submit" className="bg-green-300 p-1 rounded-sm">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
