import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  ChevronLeft,
  Loader2
} from "lucide-react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { auth } from "@/firebase";
import { theme } from "@/constants/theme";

const AuthSidePanel = ({ type }: { type: 'login' | 'signup' }) => (
  <div style={styles.sidePanel}>
    <Link to="/" style={styles.sideLogo}>
      <Brain color={theme.colors.primary} size={32} />
      <span>meetIQ</span>
    </Link>
    <h2 style={styles.sideTitle}>
      {type === 'login' 
        ? "Welcome back to your meeting hub." 
        : "Unlock the power of your conversations."}
    </h2>
    <div style={styles.sideFeatures}>
      <div style={styles.sideFeatureItem}>
        <Zap color={theme.colors.primary} size={24} />
        <div style={styles.sideFeatureText}>
          <h4 style={styles.featureLabel}>Smart Extraction</h4>
          <p style={styles.featureSub}>Decisions and action items, pulled instantly.</p>
        </div>
      </div>
      <div style={styles.sideFeatureItem}>
        <CheckSquare color={theme.colors.primary} size={24} />
        <div style={styles.sideFeatureText}>
          <h4 style={styles.featureLabel}>Accountability</h4>
          <p style={styles.featureSub}>Clear task mapping and owner tracking.</p>
        </div>
      </div>
      <div style={styles.sideFeatureItem}>
        <Search color={theme.colors.primary} size={24} />
        <div style={styles.sideFeatureText}>
          <h4 style={styles.featureLabel}>Contextual Search</h4>
          <p style={styles.featureSub}>Query your archives in natural language.</p>
        </div>
      </div>
    </div>
  </div>
);

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      navigate("/workspace");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <AuthSidePanel type="login" />
        
        <div style={styles.formPanel}>
          <header style={styles.header}>
            <Link to="/" style={styles.backLink}>
              <ChevronLeft size={16} /> Back to home
            </Link>
            <h1 style={theme.effects.gradientText}>Log In</h1>
            <p style={styles.subtitle}>Welcome back! Please enter your details.</p>
          </header>

          <form onSubmit={handleSubmit} style={styles.formBody}>
            {error && (
              <div style={styles.errorBox}>
                {error}
              </div>
            )}
            
            <div style={styles.inputWrapper}>
              <Mail style={styles.inputIcon} size={20} />
              <input 
                style={styles.input} 
                type="email" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div style={styles.inputWrapper}>
              <Lock style={styles.inputIcon} size={20} />
              <input 
                style={styles.input} 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ textAlign: 'right', marginTop: '-10px' }}>
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={20} /> : "Log In"}
              {!loading && <ArrowRight size={20} />}
            </button>

            <div style={styles.divider}>OR</div>

            <div style={styles.socialBtns}>
              <button type="button" style={styles.socialBtn}>
                <Globe size={20} /> Google
              </button>
              <button type="button" style={styles.socialBtn}>
                <Globe size={20} /> GitHub
              </button>
            </div>

            <p style={styles.switchTxt}>
              New to meetIQ? <Link to="/signup" style={styles.switchLink}>Create account</Link>
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      console.log("Signup successful");
      navigate("/workspace");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <AuthSidePanel type="signup" />

        <div style={styles.formPanel}>
          <header style={styles.header}>
            <Link to="/" style={styles.backLink}>
              <ChevronLeft size={16} /> Back to home
            </Link>
            <h1 style={theme.effects.gradientText}>Sign Up</h1>
            <p style={styles.subtitle}>Join thousands of high-performing teams.</p>
          </header>

          <form onSubmit={handleSubmit} style={styles.formBody}>
            {error && (
              <div style={styles.errorBox}>
                {error}
              </div>
            )}
            
            <div style={styles.inputWrapper}>
              <User style={styles.inputIcon} size={20} />
              <input 
                style={styles.input} 
                type="text" 
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={styles.inputWrapper}>
              <Mail style={styles.inputIcon} size={20} />
              <input 
                style={styles.input} 
                type="email" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={styles.inputWrapper}>
              <Lock style={styles.inputIcon} size={20} />
              <input 
                style={styles.input} 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p style={styles.termsTxt}>
              By signing up, you agree to our Terms and Privacy Policy.
            </p>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={20} /> : "Create Account"}
              {!loading && <ArrowRight size={20} />}
            </button>

            <div style={styles.divider}>OR</div>

            <div style={styles.socialBtns}>
              <button type="button" style={styles.socialBtn}>
                <Globe size={20} /> Google
              </button>
              <button type="button" style={styles.socialBtn}>
                <Globe size={20} /> GitHub
              </button>
            </div>

            <p style={styles.switchTxt}>
              Already have an account? <Link to="/login" style={styles.switchLink}>Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    backgroundColor: theme.colors.bgMain,
  },
  container: {
    width: "100%",
    maxWidth: "1100px",
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    borderRadius: "24px",
    overflow: "hidden",
    border: `1px solid ${theme.colors.borderGlass}`,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  },
  sidePanel: {
    background: `linear-gradient(135deg, ${theme.colors.bgAccent} 0%, rgba(17, 24, 39, 0.8) 100%)`,
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  sideLogo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "white",
    textDecoration: "none",
    marginBottom: "40px",
  },
  sideTitle: {
    fontSize: "2.5rem",
    lineHeight: 1.1,
    marginBottom: "24px",
    letterSpacing: "-1px",
  },
  sideFeatures: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  sideFeatureItem: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
  },
  sideFeatureText: {
    display: "flex",
    flexDirection: "column",
  },
  featureLabel: {
    fontSize: "1.1rem",
    margin: 0,
  },
  featureSub: {
    fontSize: "0.9rem",
    color: theme.colors.textSecondary,
    margin: 0,
  },
  formPanel: {
    backgroundColor: "rgba(10, 15, 25, 0.8)",
    backdropFilter: "blur(20px)",
    padding: "60px 80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    marginBottom: "40px",
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "20px",
    color: theme.colors.primary,
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: "1.1rem",
    marginTop: "8px",
  },
  formBody: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  errorBox: {
    background: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    border: "1px solid rgba(239, 68, 68, 0.2)",
  },
  inputWrapper: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: theme.colors.textMuted,
    opacity: 0.5,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: `1px solid ${theme.colors.borderGlass}`,
    borderRadius: "12px",
    padding: "16px 16px 16px 48px",
    color: "white",
    fontSize: "1rem",
    outline: "none",
  },
  forgotLink: {
    color: theme.colors.primary,
    fontSize: "0.85rem",
    textDecoration: "none",
    fontWeight: 600,
  },
  submitBtn: {
    width: "100%",
    padding: "16px",
    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryAlt} 100%)`,
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    margin: "8px 0",
    color: theme.colors.textMuted,
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  socialBtns: {
    display: "flex",
    gap: "16px",
  },
  socialBtn: {
    flex: 1,
    padding: "14px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: `1px solid ${theme.colors.borderGlass}`,
    borderRadius: "12px",
    color: "white",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  switchTxt: {
    textAlign: "center",
    marginTop: "16px",
    color: theme.colors.textSecondary,
    fontSize: "0.95rem",
  },
  switchLink: {
    color: theme.colors.primary,
    fontWeight: 700,
    textDecoration: "none",
  },
  termsTxt: {
    fontSize: "0.85rem",
    color: theme.colors.textMuted,
    lineHeight: 1.4,
  },
};
