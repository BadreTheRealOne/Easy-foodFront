import "./Header.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      {/* LOGO */}
      <div className="header-left">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} className="header-logo" alt="EasyFood" />
        </Link>
      </div>

      {/* NAV DESKTOP */}
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

      {/* ACTIONS DESKTOP */}
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

      {/* BURGER ICON */}
      <button
        className={`burger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* MENU MOBILE */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={closeMenu}>Accueil</Link>
        <Link to="/recipes" onClick={closeMenu}>Recettes</Link>

        {isAuthenticated && (
          <>
            <Link to="/favorites" onClick={closeMenu}>Favoris</Link>
            <Link to="/createRecipe" onClick={closeMenu}>Créer</Link>
            <Link to="/account" onClick={closeMenu}>Mon compte</Link>
          </>
        )}

        <div className="mobile-actions">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn-primary" onClick={closeMenu}>
                Connexion
              </Link>
              <Link to="/register" className="btn-outline" onClick={closeMenu}>
                Inscription
              </Link>
            </>
          ) : (
            <button className="btn-outline" onClick={logout}>
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
