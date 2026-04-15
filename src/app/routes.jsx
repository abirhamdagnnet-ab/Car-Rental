import { Fragment } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import AdminDashboard from './pages/admin/AdminDashboard';
import CarManagement from './pages/admin/CarManagement';
import CustomerManagement from './pages/admin/CustomerManagement';
import RentalManagement from './pages/admin/RentalManagement';
import Reports from './pages/admin/Reports';
import BrowseCars from './pages/user/BrowseCars';
import RentCar from './pages/user/RentCar';
import MyRentals from './pages/user/MyRentals';
import Profile from './pages/user/Profile';

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    if (requiredRole === 'admin') {
      return <Navigate to="/login" replace />;
    }

    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/user/home'} replace />;
  }

  return <Fragment>{children}</Fragment>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cars',
        element: <BrowseCars />,
      },
    ],
  },
  {
    path: '/browse',
    element: <Navigate to="/cars" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'cars',
        element: <CarManagement />,
      },
      {
        path: 'customers',
        element: <CustomerManagement />,
      },
      {
        path: 'rentals',
        element: <RentalManagement />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute requiredRole="user">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'cars',
        element: <BrowseCars />,
      },
      {
        path: 'rent/:carId',
        element: <RentCar />,
      },
      {
        path: 'my-rentals',
        element: <MyRentals />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
