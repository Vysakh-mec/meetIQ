import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Mail, 
  Lock, 
  User, 
  Globe, 
  ArrowRight, 
  Zap, 
  CheckSquare, 
  Search,
  ChevronLeft
} from "lucide-react";
import "./Auth.css";

const AuthSidePanel = ({ type }: { type: 'login' | 'signup' }) => (
  <div className="auth-side-panel">
    <Link to="/" className="side-logo" style={{ textDecoration: 'none' }}>
      <Brain className="logo-icon" size={32} />
      <span>meetIQ</span>
    </Link>
    <h2 className="side-title">
      {type === 'login' 
        ? "Welcome back to your meeting hub." 
        : "Unlock the power of your conversations."}
    </h2>
    <div className="side-features">
      <div className="side-feature-item">
        <Zap className="side-feature-icon" size={24} />
        <div className="side-feature-text">
          <h4>Smart Extraction</h4>
          <p>Decisions and action items, pulled instantly.</p>
        </div>
      </div>
      <div className="side-feature-item">
        <CheckSquare className="side-feature-icon" size={24} />
        <div className="side-feature-text">
          <h4>Accountability</h4>
          <p>Clear task mapping and owner tracking.</p>
        </div>
      </div>
      <div className="side-feature-item">
        <Search className="side-feature-icon" size={24} />
        <div className="side-feature-text">
          <h4>Contextual Search</h4>
          <p>Query your archives in natural language.</p>
        </div>
      </div>
    </div>
  </div>
);

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <AuthSidePanel type="login" />
        
        <div className="auth-form-panel">
          <header className="auth-form-header">
            <Link to="/" className="auth-switch-link" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '20px', fontSize: '0.9rem' }}>
              <ChevronLeft size={16} /> Back to home
            </Link>
            <h1 className="gradient-text">Log In</h1>
            <p>Welcome back! Please enter your details.</p>
          </header>

          <form onSubmit={handleSubmit} className="form-body">
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input 
                className="auth-input" 
                type="email" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                className="auth-input" 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ textAlign: 'right', marginTop: '-10px' }}>
              <a href="#" className="auth-switch-link" style={{ fontSize: '0.85rem' }}>Forgot password?</a>
            </div>

            <button type="submit" className="auth-btn-submit">
              Log In <ArrowRight size={20} />
            </button>

            <div className="auth-divider">OR</div>

            <div className="auth-social-btns">
              <button type="button" className="social-btn">
                <Globe size={20} /> Google
              </button>
              <button type="button" className="social-btn">
                <Globe size={20} /> GitHub
              </button>
            </div>

            <p className="auth-switch">
              New to meetIQ? <Link to="/signup" className="auth-switch-link">Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", { name, email, password });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <AuthSidePanel type="signup" />

        <div className="auth-form-panel">
          <header className="auth-form-header">
            <Link to="/" className="auth-switch-link" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '20px', fontSize: '0.9rem' }}>
              <ChevronLeft size={16} /> Back to home
            </Link>
            <h1 className="gradient-text">Sign Up</h1>
            <p>Join thousands of high-performing teams.</p>
          </header>

          <form onSubmit={handleSubmit} className="form-body">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input 
                className="auth-input" 
                type="text" 
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input 
                className="auth-input" 
                type="email" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                className="auth-input" 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              By signing up, you agree to our Terms and Privacy Policy.
            </p>

            <button type="submit" className="auth-btn-submit">
              Sign Up <ArrowRight size={20} />
            </button>

            <div className="auth-divider">OR</div>

            <div className="auth-social-btns">
              <button type="button" className="social-btn">
                <Globe size={20} /> Google
              </button>
              <button type="button" className="social-btn">
                <Globe size={20} /> GitHub
              </button>
            </div>

            <p className="auth-switch">
              Already have an account? <Link to="/login" className="auth-switch-link">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
