import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import logoImage from '../../assets/images/cars/log.png';
import Footer from '../components/shared/Footer';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const loggedInUser = await login(username, password);
      navigate(loggedInUser.role === 'admin' ? '/admin/dashboard' : '/user/home');
    } catch (_err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-sky-100 via-white to-amber-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />

      <div className="relative flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card/95 p-8 shadow-xl backdrop-blur">
          <div className="mb-8 flex flex-col items-center">
            <img src={logoImage} alt="CarRental logo" className="mb-4 h-16 w-16 shrink-0 rounded-2xl object-contain shadow-lg" />
            <h1 className="text-center text-3xl text-foreground">Car Rental System</h1>
            <p className="mt-2 text-center text-muted-foreground">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="mb-2 block text-foreground">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-input bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-muted p-4">
            <p className="mb-2 text-center text-sm text-muted-foreground">Demo Credentials:</p>
            <p className="text-center text-xs text-muted-foreground">
              Admin: admin / admin123
              <br />
              User: user / user123
            </p>
          </div>
        </div>
      </div>
      <Footer className="relative z-10 bg-background/90 backdrop-blur" />
    </div>
  );
}

