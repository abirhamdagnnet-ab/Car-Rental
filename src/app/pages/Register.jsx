import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import logoImage from '../../assets/images/cars/log.png';
import Footer from '../components/shared/Footer';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await register(username, email, password);
      navigate('/user/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-cyan-100 via-white to-rose-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />

      <div className="relative flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card/95 p-8 shadow-xl backdrop-blur">
          <div className="mb-8 flex flex-col items-center">
            <img src={logoImage} alt="CarRental logo" className="mb-4 h-16 w-16 shrink-0 rounded-2xl object-contain shadow-lg" />
            <h1 className="text-center text-3xl text-foreground">Create Account</h1>
            <p className="mt-2 text-center text-muted-foreground">Join our car rental service</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your.email@example.com"
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
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-foreground">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
            >
              Register
            </button>
          </form>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-center text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer className="relative z-10 bg-background/90 backdrop-blur" />
    </div>
  );
}

