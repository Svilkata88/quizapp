import { useState } from "react";
import { useUserContext } from "../../hooks/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { apiRegisterUser } from "../../../utils.js";
import useDebaunce from "../../hooks/useDebaunce.jsx";
import Spinner from "../others/Spinner.jsx";

function Register() {
  const { login } = useUserContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");
  const debauncedEmail = useDebaunce(emailValue, 500);
  const debauncedUsername = useDebaunce(usernameValue, 500);
  const debauncedPassword = useDebaunce(passwordValue, 500);

  const isFormValid =
    emailValue &&
    validate(debauncedEmail, "email") &&
    usernameValue &&
    validate(debauncedUsername, "username") &&
    passwordValue &&
    validate(debauncedPassword, "password") &&
    password2Value &&
    validate(password2Value, "password2");

  function handleRegister(formData) {
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    setLoading(true);

    apiRegisterUser("http://localhost:8000/api/users/register", {
      email,
      username,
      password,
      password2,
    })
      .then((data) => {
        login(data);
        navigate("/");
      })
      .catch((resErrors) => {
        Object.values(resErrors).forEach((err) => {
          err.forEach((msg) => console.error(msg));
        });
        navigate("/auth/register");
      })
      .finally(() => setLoading(false));
  }

  function validate(data, type) {
    if (!data) return true;

    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(data);
    }
    if (type === "username") {
      return data.length >= 3;
    }
    if (type === "password") {
      return data.length >= 8;
    }
    if (type === "password2") {
      return data === passwordValue;
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4">Register</h1>
      <form
        action={handleRegister}
        className="flex flex-col gap-2 w-1/4 bg-stone-200 p-2"
      >
        <input
          type="text"
          name="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="email"
          className="bg-stone-100 p-1"
        />
        <p
          className={
            emailValue && !validate(debauncedEmail, "email")
              ? "text-red-500"
              : "hidden"
          }
        >
          Please provide valid email
        </p>
        <input
          type="text"
          name="username"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
          placeholder="username"
          className="bg-stone-100 p-1"
        />
        <p
          className={
            usernameValue && !validate(debauncedUsername, "username")
              ? "text-red-500"
              : "hidden"
          }
        >
          Username must be at least 3 characters long
        </p>
        <input
          type="password"
          name="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="password"
          className="bg-stone-100 p-1"
        />
        <p
          className={
            passwordValue && !validate(debauncedPassword, "password")
              ? "text-red-500"
              : "hidden"
          }
        >
          Password must be at least 8 characters long
        </p>
        <input
          type="password"
          name="password2"
          value={password2Value}
          onChange={(e) => setPassword2Value(e.target.value)}
          placeholder="confirm password"
          className="bg-stone-100 p-1"
        />
        <p
          className={
            password2Value && !validate(password2Value, "password2")
              ? "text-red-500"
              : "hidden"
          }
        >
          Passwords do not match
        </p>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`p-1 rounded-sm transition-colors duration-150 
            ${isFormValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 cursor-not-allowed"}`}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
