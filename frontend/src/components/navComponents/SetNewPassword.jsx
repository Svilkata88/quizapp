import Spinner from "../others/Spinner.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiResetPassword } from "../../../utils.js";
import { Link } from "react-router-dom";
import FormButton from "../buttons/FormButton.jsx";
import ErrorMessage from "../formsComponents/errorMessage.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function SetNewPassword() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const isPassValid = pass && confPass;

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;

    const timer = setTimeout(() => {
      setErrors({});
      setPass("");
      setConfPass("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [errors]);

  const handlePasswordReset = (formData) => {
    const password = formData.get("password");
    const passwordConfirm = formData.get("password-confirm");

    if (password !== passwordConfirm) {
      setErrors({ Error: "Passwords do not match!" });
      return;
    }

    setLoading(true);
    apiResetPassword(`${BASE_URL}/api/users/reset-password`, {
      password,
    })
      .then((data) => {
        navigate("/auth/login");
      })
      .catch((resErrors) => {
        const formattedErrors = {};

        Object.entries(resErrors).forEach(([key, value]) => {
          formattedErrors[key] = Array.isArray(value) ? value[0] : value;
        });

        setErrors(formattedErrors);
      })
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col justify-center items-center p3">
      <h1 className="text-2xl mb-4">Set new password</h1>
      <form
        action={handlePasswordReset}
        className="flex flex-col gap-3 w-full md:w-1/2 lg:w-1/4 bg-stone-200 form-container"
      >
        <input
          type="password"
          name="password"
          placeholder="Enter your new password"
          onChange={(e) => setPass(e.target.value)}
          className="bg-stone-100 p-1 pl-2 rounded-md focus:outline-black focus:outline-2"
        />
        <input
          type="password"
          name="password-confirm"
          placeholder="Confirm your new password"
          onChange={(e) => setConfPass(e.target.value)}
          className="bg-stone-100 p-1 pl-2 rounded-md focus:outline-black focus:outline-2"
        />

        <FormButton text="Confirm" disabled={!isPassValid} />
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

export default SetNewPassword;
