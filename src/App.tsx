import { 
  Zap, 
  Brain, 
  CheckSquare, 
  Search, 
  ArrowRight,
  MessageSquare,
  Users,
  Target 
} from "lucide-react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Login, Signup } from "./pages/Auth";
import "./App.css";

// Landing Page Component
const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <header className="hero-section container">
        <span className="hero-tag">Meeting Intelligence Hub</span>
        <h1 className="hero-title">
          Turn your <span className="gradient-text">Conversations</span> into
          Actionable <span className="gradient-text">Intelligence</span>.
        </h1>
        <p className="hero-subtitle">
          Transform raw meeting transcripts into structured outcomes. meetIQ automatically
          extracts decisions and action items so your team can focus on execution.
        </p>
        <div className="hero-btns">
          <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="container">
        <div className="features-grid">
          {/* Feature 1: Intelligent Extraction */}
          <div className="feature-card glass glass-hover animate-fade-in">
            <div className="feature-icon-wrapper">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="feature-title">Smart Extraction</h3>
              <p className="feature-desc">
                Automatically identifies key decisions and action items from raw
                transcripts, saving you hours of manual review.
              </p>
            </div>
          </div>

          {/* Feature 2: Accountability & Deadlines */}
          <div
            className="feature-card glass glass-hover animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="feature-icon-wrapper">
              <CheckSquare size={24} />
            </div>
            <div>
              <h3 className="feature-title">Action Tracking</h3>
              <p className="feature-desc">
                Clearly maps tasks to owners and deadlines. Ensure that important 
                responsibilities are never lost in the dialogue.
              </p>
            </div>
          </div>

          {/* Feature 3: Contextual Querying */}
          <div
            className="feature-card glass glass-hover animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="feature-icon-wrapper">
              <Search size={24} />
            </div>
            <div>
              <h3 className="feature-title">Contextual Query System</h3>
              <p className="feature-desc">
                Ask natural language questions about past meetings and get 
                context-aware answers with direct references to the transcript.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container" style={{ padding: "80px 0" }}>
        <div className="glass" style={{ padding: "60px", borderRadius: "var(--radius-lg)", textAlign: "left" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="feature-desc" style={{ fontSize: "1.1rem", marginBottom: "24px" }}>
                Organizations conduct numerous meetings every week, generating lengthy transcripts 
                where critical information often gets buried. This leads to repeated discussions 
                and missed responsibilities.
              </p>
              <p className="feature-desc" style={{ fontSize: "1.1rem" }}>
                meetIQ was built to eliminate these inefficiencies. We transform raw dialogue 
                into structured, actionable intelligence, helping teams move directly 
                toward execution and accountability.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="glass" style={{ padding: "20px", display: "flex", gap: "15px", alignItems: "center" }}>
                <Target className="logo-icon" size={24} />
                <span>Focus on Execution</span>
              </div>
              <div className="glass" style={{ padding: "20px", display: "flex", gap: "15px", alignItems: "center" }}>
                <Users className="logo-icon" size={24} />
                <span>Team Accountability</span>
              </div>
              <div className="glass" style={{ padding: "20px", display: "flex", gap: "15px", alignItems: "center" }}>
                <MessageSquare className="logo-icon" size={24} />
                <span>Transparent History</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section
        className="container"
        id="why"
        style={{ padding: "100px 0", textAlign: "center" }}
      >
        <h2 style={{ fontSize: "2.5rem", marginBottom: "24px" }}>
          Moving Teams Toward <span className="gradient-text">Execution</span>
        </h2>
        <p className="hero-subtitle" style={{ margin: "0 auto 40px auto" }}>
          Eliminate redundant discussions and ensure every meeting leads to a clear outcome.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h4 style={{ fontSize: "3rem", color: "var(--primary)" }}>Real-time</h4>
            <p className="feature-desc">Intelligence Extraction</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ fontSize: "3rem", color: "var(--secondary)" }}>Direct</h4>
            <p className="feature-desc">Accountability Mapping</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ fontSize: "3rem", color: "var(--accent)" }}>Natural</h4>
            <p className="feature-desc">Information Retrieval</p>
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="app">
      {/* Navbar - Hidden on Auth Pages */}
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
