import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import DashboardRealtime from './components/DashboardRealtime';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import { useAuth } from './contexts/Authcontext';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{padding:20}}>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected><DashboardRealtime /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
