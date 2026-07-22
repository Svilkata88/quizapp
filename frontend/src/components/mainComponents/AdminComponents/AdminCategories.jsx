import { useState, useEffect } from "react";
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
      <h2 className="text-base font-bold mb-4">Questions Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.name} className="text-base">
              {category.name}
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
