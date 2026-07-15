import { useState, useEffect } from "react";
import { fetchCategories } from "../../../../utils.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(`${BASE_URL}/api/questions/admin/categories/`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  return (
    <div>
      <h2>Admin Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => <li key={category}>{category}</li>)
        ) : (
          <li>No categories found.</li>
        )}
      </ul>
    </div>
  );
}

export default AdminCategories;
