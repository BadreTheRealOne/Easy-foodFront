import { JSX, useState } from 'react';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Register.css';

function Register(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!consent) {
      setError('Vous devez accepter la politique de confidentialité');
      return;
    }

    try {
      await api.post('/auth/register', {
        email,
        password,
        name,
        consent_rgpd: consent,
      });

      navigate('/login');
    } catch {
      setError('Erreur lors de l’inscription');
    }
  };

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-left">
          <div className="left-title-l">
            <h2>
              EasyFood <br />
              <span className="orange-t">Recettes étudiant</span>
            </h2>
          </div>

          <div className="img-left-c">
            <img src={logo} alt="EasyFood logo" />
          </div>

          <p>Des recettes simples pour la vie étudiante.</p>
        </div>

        <form className="register-right" onSubmit={handleSubmit}>
          <h1>Inscription</h1>

          {error && <p className="form-error">{error}</p>}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>mot de passe</label>

<div className="password-field">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <span
    className="password-eye"
    onClick={() => setShowPassword(!showPassword)}
  >
    {/* ŒIL OUVERT */}
    <svg
      className={`eye-icon ${showPassword ? "visible" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
    </svg>

    {/* ŒIL BARRÉ */}
    <svg
      className={`eye-icon ${!showPassword ? "visible" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M2 5l17 17M12 5c-7 0-10 7-10 7a17 17 0 0 0 4.5 5.5M12 19c7 0 10-7 10-7a17 17 0 0 0-4.5-5.5"/>
    </svg>
  </span>
</div>

          <label>Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="register-checkbox">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>J’accepte la politique de confidentialité</span>
          </div>

          <button type="submit" className="register-btn">
            S’inscrire
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;
