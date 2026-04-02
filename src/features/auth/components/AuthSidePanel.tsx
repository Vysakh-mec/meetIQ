import { Link } from "react-router-dom";
import { Brain, Zap, CheckSquare, Search } from "lucide-react";
import { theme } from "@/constants/theme";

export const AuthSidePanel = ({ type }: { type: 'login' | 'signup' }) => (
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

const styles: Record<string, React.CSSProperties> = {
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
};
