import { NavLink, Outlet, useNavigate } from 'react-router';
import { Car, ClipboardList, Home, LogOut, Moon, Sun, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import logoImage from '../../assets/images/cars/log.png';
import Footer from '../components/shared/Footer';

const navItems = [
  { icon: Home, label: 'Home', path: '/user/home' },
  { icon: Car, label: 'Car', path: '/user/cars' },
  { icon: ClipboardList, label: 'My Rentals', path: '/user/my-rentals' },
  { icon: UserIcon, label: 'Profile', path: '/user/profile' },
];

function navLinkClass(isActive) {
  return isActive
    ? 'inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground'
    : 'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors';
}

function UserAvatar({ user }) {
  if (user?.profileImage) {
    return <img src={user.profileImage} alt="User avatar" className="h-9 w-9 rounded-full object-cover" />;
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
      {user?.username?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
}

export default function UserLayout() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate('/user/home')}
            className="inline-flex items-center gap-1.5"
          >
            <img src={logoImage} alt="CarRental logo" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-primary">Car</span>
              <span className="text-amber-600 dark:text-amber-300">Rental</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => navLinkClass(isActive)}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 transition-colors hover:bg-accent"
              aria-label="Toggle theme"
              type="button"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={() => navigate('/user/profile')}
              className="rounded-full ring-2 ring-transparent transition-all hover:ring-primary/40"
              title="Profile"
            >
              <UserAvatar user={user} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
              type="button"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <nav className="flex items-center justify-around border-t border-border px-2 py-2 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'inline-flex flex-col items-center gap-1 text-xs text-primary'
                  : 'inline-flex flex-col items-center gap-1 text-xs text-muted-foreground'
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

