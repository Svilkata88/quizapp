import { useState, useEffect } from "react";
import { fetchCategories } from "../../../../utils.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories(`${BASE_URL}/api/questions/admin/categories/`)
      .then((data) => {
        setCategories(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      <h2 className="text-white font-bold mb-4">Admin Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category} className="text-white">
              {category}
            </li>
          ))
        ) : (
          <li className="text-white">No categories found.</li>
        )}
      </ul>
    </div>
  );
}

export default AdminCategories;
