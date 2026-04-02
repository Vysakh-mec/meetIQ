import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { theme } from "@/constants/theme";

export const SignupForm = () => {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      navigate("/workspace");
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.formPanel}>
      <header style={styles.header}>
        <Link to="/" style={styles.backLink}>
          <ChevronLeft size={16} /> Back to home
        </Link>
        <h1 style={theme.effects.gradientText}>Sign Up</h1>
        <p style={styles.subtitle}>Join thousands of high-performing teams.</p>
      </header>

      <form onSubmit={handleSubmit} style={styles.formBody}>
        {error && <div style={styles.errorBox}>{error}</div>}

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
          {loading ? (
            <Loader2
              style={{ animation: "spin 1s linear infinite" }}
              size={20}
            />
          ) : (
            "Create Account"
          )}
          {!loading && <ArrowRight size={20} />}
        </button>

        <p style={styles.switchTxt}>
          Already have an account?{" "}
          <Link to="/login" style={styles.switchLink}>
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
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
