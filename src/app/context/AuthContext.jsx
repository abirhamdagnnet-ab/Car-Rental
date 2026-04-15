import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(undefined);

const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@carrental.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username, password) => {
    const foundUser = mockUsers.find((u) => u.username === username && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _hiddenPassword, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  };

  const register = async (username, email, password) => {
    const existingUser = mockUsers.find((u) => u.username === username || u.email === email);

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      username,
      email,
      role: 'user',
    };

    mockUsers.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    const userIndex = mockUsers.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        username: updatedUser.username,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
