import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../../../utils.js";
import Spinner from "../../others/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories(`${BASE_URL}/api/questions/admin/categories/`)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <section
      className={`flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-5 md:mt-10 mx-auto p-4 rounded-lg shadow-[var(--blue-shadow)] scrollable w-full xl:w-[1000px] max-h-150`}
    >
      <section className="flex justify-between items-center">
        <h2 className="text-base font-bold">Questions Categories</h2>
        <Link className="w-8 pointer hover:scale-110" to="./create">
          <img src="/addbtn.png" alt="add button" />
        </Link>
      </section>
      <ul>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={category.name} className="text-base">
              {index + 1}. {category.name}
            </li>
          ))
        ) : (
          <li className="text-white">No categories found.</li>
        )}
      </ul>
    </section>
  );
}

export default AdminCategories;
