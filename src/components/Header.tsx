import "./Header.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} className="header-logo" />
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/">Accueil</Link>
        <Link to="/recipes">Recettes</Link>

        {isAuthenticated && (
          <>
            <Link to="/favorites">Favoris</Link>
            <Link to="/createRecipe">Créer</Link>
            <Link to="/account">Mon compte</Link>
          </>
        )}
      </nav>

      <div className="header-actions">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="btn-primary">Connexion</Link>
            <Link to="/register" className="btn-outline">Inscription</Link>
          </>
        ) : (
          <button className="btn-outline" onClick={logout}>
            Déconnexion
          </button>
        )}
      </div>
    </header>
  );
}
