import { JSX, useState } from 'react';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Register.css';

function Register(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
        consent_rgpd: consent,
      });

      console.log('REGISTER OK :', response.data);

      // 👉 si plus tard tu renvoies un token à l’inscription
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/recipes');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError('Erreur lors de l’inscription');
    }
  };

  return (
    <main className="register-page">
      <div className="register-container">

        {/* GAUCHE */}
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

        {/* DROITE */}
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

          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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
