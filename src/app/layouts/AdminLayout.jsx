import { Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard,
  Car,
  Users,
  FileText,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  User as UserIcon,
} from 'lucide-react';
import logoImage from '../../assets/images/cars/log.png';
import Footer from '../components/shared/Footer';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Car, label: 'Manage Cars', path: '/admin/cars' },
    { icon: Users, label: 'Manage Customers', path: '/admin/customers' },
    { icon: ClipboardList, label: 'Manage Rentals', path: '/admin/rentals' },
    { icon: FileText, label: 'Reports', path: '/admin/reports' },
    { icon: UserIcon, label: 'Profile', path: '/admin/profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const avatar = user?.profileImage ? (
    <img src={user.profileImage} alt="Admin avatar" className="h-9 w-9 rounded-full object-cover" />
  ) : (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
      {user?.username?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden border-r border-sidebar-border bg-sidebar transition-all duration-300`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-sidebar-border px-6">
            <img src={logoImage} alt="CarRental logo" className="mr-2 h-12 w-12 shrink-0 rounded-lg object-cover" />
            <span className="text-xl font-semibold tracking-tight text-sidebar-foreground">
              <span className="text-primary">Car</span>
              <span className="text-amber-600 dark:text-amber-300">Rental</span>
            </span>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex w-full items-center rounded-lg px-4 py-3 text-sidebar-foreground transition-colors hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-700 dark:hover:text-cyan-200"
                type="button"
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-cyan-100 dark:hover:bg-cyan-900/30"
            type="button"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 transition-colors hover:bg-cyan-100 dark:hover:bg-cyan-900/30"
              aria-label="Toggle theme"
              type="button"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/profile')}
              className="rounded-full ring-2 ring-transparent transition-all hover:ring-primary/40"
              title="Profile"
            >
              {avatar}
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
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}


