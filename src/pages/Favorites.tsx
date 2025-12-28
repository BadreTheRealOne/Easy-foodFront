import "./Favorites.css";
import { useEffect, useState } from "react";
import { api, API_URL } from "../api/axios";
import { useNavigate } from "react-router-dom";

type Favorite = {
  id: string;
  recipe: {
    id: string;
    title: string;
    imageUrl?: string | null;
  };
};

export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/favorites");
        setFavorites(res.data);
      } catch (err) {
        navigate("/login");
      }
    };

    fetchFavorites();
  }, [navigate]);

  return (
    <main className="favorites-page">
      <div className="favorites-wrapper">
        <h1 className="favorites-title">Mes recettes favorites</h1>

        <section className="favorites-grid">
          {favorites.map((fav) => (
            <article className="favorite-card" key={fav.recipe.id}>
              <img
                src={
                  fav.recipe.imageUrl
                    ? `${API_URL}${fav.recipe.imageUrl}`
                    : "/placeholder.jpg"
                }
                alt={fav.recipe.title}
              />

              <h3>{fav.recipe.title}</h3>

              <button onClick={() => navigate(`/recipes/${fav.recipe.id}`)}>
                Voir
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
