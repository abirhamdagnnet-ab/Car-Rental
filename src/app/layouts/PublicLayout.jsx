import { NavLink, Outlet, useNavigate } from 'react-router';
import logoImage from '../../assets/images/cars/log.png';
import Footer from '../components/shared/Footer';

function navLinkClass(isActive) {
  return isActive
    ? 'px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm'
    : 'px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors';
}

export default function PublicLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:h-16 sm:flex-nowrap sm:py-0 sm:px-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5"
          >
            <img src={logoImage} alt="CarRental logo" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-primary">Car</span>
              <span className="text-amber-600 dark:text-amber-300">Rental</span>
            </span>
          </button>

          <nav className="order-3 flex w-full items-center justify-center gap-1 sm:order-none sm:w-auto">
            <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
              Home
            </NavLink>
            <NavLink to="/cars" className={({ isActive }) => navLinkClass(isActive)}>
              Car
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => navLinkClass(isActive)}>
              Dashboard
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
