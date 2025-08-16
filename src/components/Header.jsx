import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Header() {
  const { user, logout, csrf } = useAuth();
  return (
    <header className="nav">
      <div className="brand">💸 Send Pocket Money</div>
      <nav>
        {user ? (
          <div className="username_container">
            <span className="badge greeting_and_user_name">Hi, {user.name}</span>
            <button className="logout" onClick={() => logout()} aria-label="Log out">Logout</button>
          </div>
        ) : (
          <span className="helper">Please register or log in</span>
        )}
      </nav>
    </header>
  );
}
