import "./CreateRecipe.css";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

type Category = {
  id: string;
  name: string;
};

export default function CreateRecipe() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    title: "",
    categoryId: "",
    imageUrl: "",
    ingredients: "",
    steps: "",
    description: "",
  });

  // 🔐 Protection route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // 📦 Récupération des catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Erreur récupération catégories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/recipes", form);
      navigate("/recipes");
    } catch (err) {
      console.error("Erreur création recette", err);
      alert("Erreur lors de la création de la recette");
    }
  };

  return (
    <main className="create-recipe-page">
      <h1 className="create-recipe-title">Créer une recette</h1>

      <form className="create-recipe-form" onSubmit={handleSubmit}>

        {/* LIGNE 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>Titre</label>
            <input
              name="title"
              type="text"
              placeholder="Ex : Pâtes carbonara"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Catégorie</label>
            <select
              name="categoryId"
              onChange={handleChange}
              required
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* IMAGE */}
        <div className="form-row">
          <div className="form-group full">
            <label>Image (URL)</label>
            <input
              name="imageUrl"
              type="text"
              placeholder="https://..."
              onChange={handleChange}
            />
          </div>
        </div>

        {/* INGREDIENTS */}
        <div className="form-group full">
          <label>Ingrédients</label>
          <textarea
            name="ingredients"
            placeholder="• 200g de pâtes
• 100g de lardons
• Crème fraîche"
            onChange={handleChange}
            required
          />
        </div>

        {/* ETAPES */}
        <div className="form-group full">
          <label>Étapes</label>
          <textarea
            name="steps"
            placeholder="1. Faire cuire les pâtes
2. Faire revenir les lardons..."
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="form-group full">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Recette rapide, économique et idéale pour les étudiants."
            onChange={handleChange}
          />
        </div>

        <button className="create-btn" type="submit">
          Créer la recette
        </button>
      </form>
    </main>
  );
}
