import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";
import { Login, Signup } from "../features/auth/pages/Auth";
import { Workspace } from "../features/workspace/Workspace";
import { LandingPage } from "../features/landing/LandingPage";

export const AppRouter = () => {
  const location = useLocation();
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/signup" || 
    location.pathname === "/workspace";

  return (
    <>
      {/* Navbar - Hidden on Auth and Workspace Pages */}
      {!isAuthPage && (
        <nav className="navbar glass">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="logo-container">
              <Brain className="logo-icon" size={32} />
              <span>meetIQ</span>
            </div>
          </Link>
          <ul className="nav-links">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
          <div className="nav-btns" style={{ display: 'flex', gap: '12px' }}>
            <Link to="/login" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
        </nav>
      )}

      {/* Main Content with Routing */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/workspace" element={<Workspace />} />
        </Routes>
      </main>
    </>
  );
};
