import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import { theme } from "@/constants/theme";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export const Navbar = () => {
  const session = useSelector((state: RootState) => state.auth);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logoLink}>
        <div style={styles.logoContainer}>
          <Brain style={{ color: theme.colors.primary }} size={32} />
          <span style={styles.logoText}>meetIQ</span>
        </div>
      </Link>
      <ul style={styles.navLinks}>
        <li>
          <a href="#features" style={styles.navLink}>
            Features
          </a>
        </li>
        <li>
          <a href="#how-it-works" style={styles.navLink}>
            How it works
          </a>
        </li>
        <li>
          <a href="#faq" style={styles.navLink}>
            FAQ
          </a>
        </li>
      </ul>
      <div style={styles.navBtns}>
        {session.isAuthenticated ? (
          <Link
            to="/workspace"
            style={{ ...styles.btn, ...styles.btnSecondary }}
          >
            Go to Workspace
          </Link>
        ) : (
          <>
            <Link to="/login" style={{ ...styles.btn, ...styles.btnSecondary }}>
              Login
            </Link>
            <Link to="/signup" style={{ ...styles.btn, ...styles.btnPrimary }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    height: "80px",
    width: "100%",
    padding: "0 5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: "16px",
    zIndex: 1000,
    ...theme.effects.glass,
    borderRadius: theme.radius.lg,
    maxWidth: "1400px",
    margin: "16px auto",
  },
  logoLink: {
    textDecoration: "none",
    color: "inherit",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: 800,
    letterSpacing: "-1px",
  },
  navLinks: {
    display: "flex",
    gap: "32px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: theme.colors.textSecondary,
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
  },
  navBtns: {
    display: "flex",
    gap: "12px",
  },
  btn: {
    padding: "10px 24px",
    borderRadius: theme.radius.md,
    fontSize: "0.9rem",
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.2s",
  },
  btnPrimary: {
    backgroundColor: theme.colors.primary,
    color: "white",
  },
  btnSecondary: {
    border: `1px solid ${theme.colors.borderGlass}`,
    color: "white",
    backgroundColor: "transparent",
  },
};
