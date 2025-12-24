import "./Favorites.css";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
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
  }, []);

  return (
    <main className="Favorites-page">
      <div className="Favorites-wrapper">
        <h1 className="Favorites-title">Mes recettes favorites</h1>

        <section className="Favorites-grid">
          {favorites.map((fav) => (
            <article className="Favorite-card" key={fav.recipe.id}>
              <img
                src={fav.recipe.imageUrl || "/placeholder.jpg"}
                alt="Recette"
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
