import "./Profile.css";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../pages/ConfirmModal";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  // 🔐 Protection
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  // 📡 Fetch profil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me/export");
        setUser(res.data);
      } catch (err) {
        console.error("Erreur profil", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ❌ Delete account
  const handleDeleteAccount = async () => {
    try {
      await api.delete("/users/me");
      localStorage.removeItem("token");
      setShowConfirm(false);
      setShowSuccess(true);
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  if (loading) {
    return <p className="profile-loading">Chargement...</p>;
  }

  if (!user) {
    return <p className="profile-loading">Profil introuvable</p>;
  }

  return (
    <main className="profile-page">
      <div className="profile-card">

        <h1 className="profile-title">Mon compte</h1>

        <div className="profile-info">
          <div className="profile-row">
            <span>Nom</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-row">
            <span>Membre depuis</span>
            <strong>
              {new Date(user.createdAt).toLocaleDateString()}
            </strong>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="danger-btn"
            onClick={() => setShowConfirm(true)}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>

      {/* MODAL CONFIRMATION */}
      {showConfirm && (
        <ConfirmModal
          title="Suppression du compte"
          message="Cette action est irréversible. Toutes vos recettes et favoris seront supprimés."
          confirmText="Supprimer"
          cancelText="Annuler"
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDeleteAccount}
        />
      )}

      {/* MODAL SUCCESS */}
      {showSuccess && (
        <ConfirmModal
          title="Compte supprimé"
          message="Votre compte a été supprimé avec succès."
          confirmText="OK"
          cancelText=""
          onConfirm={() => navigate("/")}
          onCancel={() => navigate("/")}
        />
      )}
    </main>
  );
}
