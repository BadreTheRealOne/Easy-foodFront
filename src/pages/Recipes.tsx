import "./Recipes.css";
import recetteImg from "../assets/menue-home-img.png";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../utils/jwt";
import ConfirmModal from "./ConfirmModal";

type Recipe = {
  id: string;
  title: string;
  imageUrl?: string | null;
  userId: string;
  user?: { id: string; name: string };
  category?: { id: string; name: string };
};

type RecipesResponse = {
  items: Recipe[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export default function Recipes() {
  const navigate = useNavigate();

  const myUserId = getUserIdFromToken();
  const isAuthenticated = !!localStorage.getItem("token");

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  // modal delete
  const [showDelete, setShowDelete] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);

  const limit = 10;

  const fetchPage = async (p: number) => {
    setLoading(true);
    try {
      const res = await api.get<RecipesResponse>(`/recipes?page=${p}&limit=${limit}`);
      const newItems = res.data.items;

      setRecipes((prev) => (p === 1 ? newItems : [...prev, ...newItems]));
      setHasNext(res.data.meta.hasNext);
    } catch (err) {
      console.error("Erreur récupération recettes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  const loadMore = () => {
    if (!hasNext || loading) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  };

  const askDelete = (r: Recipe) => {
    setRecipeToDelete(r);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      await api.delete(`/recipes/${recipeToDelete.id}`);
      setRecipes((prev) => prev.filter((x) => x.id !== recipeToDelete.id));
    } catch (err) {
      console.error("Erreur suppression recette", err);
    } finally {
      setShowDelete(false);
      setRecipeToDelete(null);
    }
  };

  return (
    <main className="recipes-page">
      <div className="recipes-wrapper">
        <h1 className="recipes-title">Toutes les recettes</h1>

        {recipes.length === 0 && !loading ? (
          <p className="no-recipes">Aucune recette disponible pour le moment.</p>
        ) : (
          <>
            <section className="recipes-grid">
              {recipes.map((recipe) => {
                const isMine = !!myUserId && recipe.userId === myUserId;

                return (
                  <article className="recipe-card" key={recipe.id}>
                    <div className="recipe-thumb">
                      <img
                        src={recipe.imageUrl || recetteImg}
                        alt={recipe.title}
                      />

                      {isMine && (
                        <span className="badge-mine">Ma recette</span>
                      )}
                    </div>

                    <div className="recipe-card-body">
                      <h3 className="recipe-card-title">{recipe.title}</h3>

                      <div className="recipe-meta">
                        <span className="recipe-author">
                          {recipe.user?.name ? `par ${recipe.user.name}` : ""}
                        </span>
                        <span className="recipe-category">
                          {recipe.category?.name ?? ""}
                        </span>
                      </div>

                      <div className="recipe-actions">
                        <button
                          className="recipe-btn"
                          onClick={() => navigate(`/recipes/${recipe.id}`)}
                        >
                          Voir
                        </button>

                        {isAuthenticated && isMine && (
                          <button
                            className="recipe-btn danger"
                            onClick={() => askDelete(recipe)}
                          >
                            Supprimer
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <div className="recipes-loadmore">
              {hasNext ? (
                <button
                  className="loadmore-btn"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? "Chargement..." : "Charger plus"}
                </button>
              ) : (
                <p className="end-list">Fin des recettes ✅</p>
              )}
            </div>
          </>
        )}
      </div>

      {showDelete && recipeToDelete && (
        <ConfirmModal
          title="Suppression"
          message={`Supprimer "${recipeToDelete.title}" ? Cette action est irréversible.`}
          confirmText="Oui, supprimer"
          cancelText="Annuler"
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDelete(false);
            setRecipeToDelete(null);
          }}
        />
      )}
    </main>
  );
}
