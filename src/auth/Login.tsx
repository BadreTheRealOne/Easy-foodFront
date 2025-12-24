import { JSX, useState } from 'react';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Login.css';

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accepted) {
      setError('Vous devez accepter la politique de confidentialité');
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem('token', token);

      navigate('/recipes');
    } catch {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <main className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>

        <div className="login-left">
          <div className="left-title-l">
            <h2>
              EasyFood <br />
              <span className="orange-t">Recettes étudiant</span>
            </h2>
          </div>

          <div className="img-left-c">
            <img src={logo} alt="logo" />
          </div>

          <p>Des recettes simples pour la vie étudiante.</p>
        </div>

        <div className="login-right">
          <h1>connexion</h1>

          <label>email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='on'
          />

          <label>mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='on'
          />

          <div className="login-checkbox">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>j’accepte la politique de confidentialité</span>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">
            se connecter
          </button>
        </div>

      </form>
    </main>
  );
}

export default Login;
