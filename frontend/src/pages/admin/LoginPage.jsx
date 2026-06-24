import { Eye, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiSend } from '../../api/client';
import { getAuthToken, saveSession } from '../../auth/session';
import { Logo } from '../../components/common/Logo';

export function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  if (getAuthToken()) {
    return <Navigate to="/admin" replace />;
  }

  async function submit(event) {
    event.preventDefault();
    setError('');

    try {
      const session = await apiSend('/auth/login', credentials);
      saveSession(session);
      navigate('/admin', { replace: true });
    } catch {
      setError('Email ou mot de passe incorrect.');
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={submit}>
        <Logo />
        <div className="login-title">
          <h1>Connectez-vous a votre compte</h1>
          <p>Saisissez vos informations pour acceder a votre espace.</p>
        </div>
        <label>
          Adresse e-mail
          <input
            required
            placeholder="votre.email@example.com"
            type="email"
            value={credentials.email}
            onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
          />
        </label>
        <label>
          Mot de passe
          <span className="login-password">
            <input
              required
              placeholder="Votre mot de passe"
              type="password"
              value={credentials.password}
              onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
            />
            <Eye size={16} />
          </span>
        </label>
        <div className="login-options">
          <label>
            <input type="checkbox" /> Se souvenir de moi
          </label>
          <a href="/admin/login">Mot de passe oublie ?</a>
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="button" type="submit">
          <LockKeyhole size={17} /> Se connecter
        </button>
        <small>Vos informations sont securisees et traitees avec confidentialite.</small>
      </form>
      <aside className="login-visual" aria-label="Equipe DevGroup">
        <img src="/images/heroes/team.jpg" alt="" />
      </aside>
    </main>
  );
}
