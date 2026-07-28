import { apiCreateCategory } from "./../../../../utils";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../others/Spinner";
import ErrorMessage from "../../formsComponents/ErrorMessage";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function CreateAdminCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => setError(null), 2500);
  }, [error]);

  const handleCreateCategory = (formData) => {
    setLoading(true);

    apiCreateCategory(
      `${BASE_URL}/api/questions/admin/categories/create/`,
      formData,
    )
      .then(() => {
        navigate("/admin/questions/categories");
      })
      .catch((e) => {
        setError(e);
      });
  };

  if (loading) return <Spinner />;

  return (
    <section
      className={`relative flex flex-col gap-1 items-center bg-gradient-to-b from-zinc-100 to-zinc-400 mt-5 md:mt-10 mx-auto p-4 rounded-lg shadow-[var(--blue-shadow)] w-full xl:w-[1000px] max-h-150`}
    >
      <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg item-center">
        <h2 className="text-center text-2xl">Create new Category</h2>
      </div>

      <form
        action={handleCreateCategory}
        className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3"
      >
        <input
          type="text"
          name="categoryName"
          placeholder="Enter new category name"
          className="border border-black bg-zinc-50 pl-2 p-1 rounded-md "
        />
        <button className="p-1 bg-green-300 hover:bg-green-400 rounded-md">
          Create
        </button>

        <div className="flex flex-col gap-2 mt-2">
          {error &&
            Object.entries(error).map((error, index) => (
              <ErrorMessage key={index} error={error} />
            ))}
        </div>

        <Link
          className="w-8 absolute left-5 top-5 pointer hover:scale-110 rounded-full border border-gray-500 p-2 bg-gray-700/70"
          to="/admin/questions/categories"
        >
          <img src="/arrowLeftGreen.png" alt="" />
        </Link>
      </form>
    </section>
  );
}

export default CreateAdminCategory;
