import "./CreateRecipe.css";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import successGif from "../assets/usopp.gif"; // 👈 ton gif ici

type Category = {
  id: string;
  name: string;
};

export default function CreateRecipe() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const [form, setForm] = useState({
    title: "",
    categoryId: "",
    ingredients: "",
    steps: "",
    description: "",
  });

  // modal
  const [showModal, setShowModal] = useState(false);

  // 🔐 protection route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // catégories
  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const data = new FormData();
  data.append("title", form.title);
  data.append("categoryId", form.categoryId);
  data.append("ingredients", form.ingredients);
  data.append("steps", form.steps);
  data.append("description", form.description);

  if (imageFile) data.append("image", imageFile);

  try {
    await api.post("/recipes", data); // ✅ BACK OK

    setShowModal(true); // ✅ MODAL APRÈS 200

    // reset
    setForm({
      title: "",
      categoryId: "",
      ingredients: "",
      steps: "",
      description: "",
    });
    setImageFile(null);
    setPreview(null);

  } catch (err) {
    console.error(err);
    alert("Erreur lors de la création de la recette");
  }
};


  return (
    <main className="create-recipe-page">
      <h1 className="create-recipe-title">Créer une recette</h1>

      <form className="create-recipe-form" onSubmit={handleSubmit}>
        <div className="cr-row">
          <div className="cr-group">
            <label>Titre</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cr-group">
            <label>Catégorie</label>
            <select
              name="categoryId"
              value={form.categoryId}
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

        {/* DROP IMAGE */}
        <div className="cr-group">
          <label>Image</label>
          <label className="cr-drop">
            {preview ? (
              <img className="cr-drop-preview" src={preview} alt="preview" />
            ) : (
              <div className="cr-drop-empty">
                <strong>Glisse une image ici</strong>
                <span>ou clique pour choisir</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file)); // 🔑 LA CLÉ
                }
              }}
            />
          </label>
        </div>

        <div className="cr-group">
          <label>Ingrédients</label>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        <div className="cr-group">
          <label>Étapes</label>
          <textarea
            name="steps"
            value={form.steps}
            onChange={handleChange}
            required
          />
        </div>

        <div className="cr-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button className="create-btn">Créer la recette</button>
      </form>

      {/* ✅ MODAL SUCCÈS */}
      {showModal && (
  <ConfirmModal
    title="Recette bien créée 🎉"
    message="Ta recette a été ajoutée avec succès."
    gifUrl={successGif}          // 👈 ton gif
    confirmText="Voir les recettes"
    cancelText="Rester ici"
    autoCloseMs={2500}           // 👈 auto close
    onConfirm={() => navigate("/recipes")}
    onCancel={() => setShowModal(false)}
  />
)}

    </main>
  );
}
