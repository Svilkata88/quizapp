import Spinner from "../others/Spinner.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiResetPassword } from "../../../utils.js";
import { Link } from "react-router-dom";
import FormButton from "../buttons/FormButton.jsx";
import ErrorMessage from "../formsComponents/errorMessage.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function EmailPasswordReset() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSendEmail = (formData) => {
    const email = formData.get("email");
    const emailRegex =
      /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

    const isEmailValid = emailRegex.test(email) && email;
    if (!isEmailValid) {
      setErrors({ Error: "Email is not valid!" });
      return;
    }

    setLoading(true);
    apiResetPassword(`${BASE_URL}/api/users/reset-password`, {
      email,
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
    <div className="flex flex-col justify-center items-center p-3">
      <h1 className="text-2xl mb-4">Resset you password</h1>
      <form
        action={handleSendEmail}
        className="flex flex-col gap-3 w-full md:w-1/2 lg:w-1/4 bg-stone-200 form-container"
      >
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          className="bg-stone-100 p-1 pl-2 rounded-md focus:outline-black focus:outline-2"
        />

        <FormButton text="Send" />
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

export default EmailPasswordReset;
