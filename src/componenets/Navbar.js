import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="brand" to="/">HealthApp</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <Link className="nav-link" to="/profile">Profile</Link>
            <button onClick={handleLogout} className="btn-ghost">Logout</button>
          </>
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
