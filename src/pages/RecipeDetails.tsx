import "./RecipeDetails.css";
import recetteImg from "../assets/menue-home-img.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { api } from "../api/axios";

type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  imageUrl?: string;
};

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const [showFavModal, setShowFavModal] = useState(false);
  const [favMessage, setFavMessage] = useState("");

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("Erreur récupération recette", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddFavorite = async () => {
    if (!recipe) return;

    try {
      await api.post(`/favorites/${recipe.id}`);
      setFavMessage("La recette a été ajoutée à vos favoris ⭐");
    } catch {
      setFavMessage("Cette recette est déjà dans vos favoris");
    } finally {
      setShowFavModal(true);
    }
  };

  if (loading) {
    return <p style={{ color: "white", textAlign: "center" }}>Chargement...</p>;
  }

  if (!recipe) {
    return <p style={{ color: "white", textAlign: "center" }}>Recette introuvable</p>;
  }

  return (
    <main className="recipe-details-page">
      <div className="recipe-details-wrapper">

        <h1 className="recipe-details-main-title">
          {recipe.title}
        </h1>

        <div className="recipe-details-image-box">
          <img
            src={recipe.imageUrl || recetteImg}
            alt={recipe.title}
          />
        </div>

        <div className="recipe-details-card">
          <div className="recipe-details-card-header">
            <h2 className="recipe-details-title">{recipe.title}</h2>

            {isAuthenticated && (
              <button
                className="recipe-details-fav"
                onClick={handleAddFavorite}
              >
                Ajouter aux favoris ⭐
              </button>
            )}
          </div>

          <section className="recipe-details-section">
            <h3>Ingrédients</h3>
            <p>{recipe.ingredients}</p>
          </section>

          <section className="recipe-details-section">
            <h3>Étapes</h3>
            <p>{recipe.steps}</p>
          </section>

          <section className="recipe-details-section">
            <h3>Description</h3>
            <p>{recipe.description}</p>
          </section>
        </div>

        {showFavModal && (
          <ConfirmModal
            title="Favoris"
            message={favMessage}
            confirmText="OK"
            cancelText=""
            onCancel={() => setShowFavModal(false)}
            onConfirm={() => setShowFavModal(false)}
          />
        )}

      </div>
    </main>
  );
}
