import { 
  Zap, 
  CheckSquare, 
  Search, 
  ArrowRight,
  MessageSquare,
  Users,
  Target 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@components/Navbar";
import { theme } from "@/constants/theme";

export const LandingPage = () => {
  return (
    <div style={styles.appContainer}>
      <Navbar />
      
      {/* Hero Section */}
      <header style={styles.heroSection}>
        <span style={styles.heroTag}>Meeting Intelligence Hub</span>
        <h1 style={styles.heroTitle}>
          Turn your <span style={theme.effects.gradientText}>Conversations</span> into
          Actionable <span style={theme.effects.gradientText}>Intelligence</span>.
        </h1>
        <p style={styles.heroSubtitle}>
          Transform raw meeting transcripts into structured outcomes. meetIQ automatically
          extracts decisions and action items so your team can focus on execution.
        </p>
        <div style={styles.heroBtns}>
          <Link to="/signup" style={styles.btnPrimary}>
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" style={styles.container}>
        <div style={styles.featuresGrid}>
          {/* Feature 1: Intelligent Extraction */}
          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}>
              <Zap size={24} style={{ color: theme.colors.primary }} />
            </div>
            <div>
              <h3 style={styles.featureTitle}>Smart Extraction</h3>
              <p style={styles.featureDesc}>
                Automatically identifies key decisions and action items from raw
                transcripts, saving you hours of manual review.
              </p>
            </div>
          </div>

          {/* Feature 2: Accountability & Deadlines */}
          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}>
              <CheckSquare size={24} style={{ color: theme.colors.primary }} />
            </div>
            <div>
              <h3 style={styles.featureTitle}>Action Tracking</h3>
              <p style={styles.featureDesc}>
                Clearly maps tasks to owners and deadlines. Ensure that important 
                responsibilities are never lost in the dialogue.
              </p>
            </div>
          </div>

          {/* Feature 3: Contextual Querying */}
          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}>
              <Search size={24} style={{ color: theme.colors.primary }} />
            </div>
            <div>
              <h3 style={styles.featureTitle}>Contextual Query System</h3>
              <p style={styles.featureDesc}>
                Ask natural language questions about past meetings and get 
                context-aware answers with direct references to the transcript.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ ...styles.container, padding: "80px 0" }}>
        <div style={{ ...theme.effects.glass, padding: "60px", borderRadius: theme.radius.lg }}>
          <div style={styles.aboutGrid}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                Our <span style={theme.effects.gradientText}>Mission</span>
              </h2>
              <p style={{ ...styles.featureDesc, fontSize: "1.1rem", marginBottom: "24px" }}>
                Organizations conduct numerous meetings every week, generating lengthy transcripts 
                where critical information often gets buried. This leads to repeated discussions 
                and missed responsibilities.
              </p>
              <p style={{ ...styles.featureDesc, fontSize: "1.1rem" }}>
                meetIQ was built to eliminate these inefficiencies. We transform raw dialogue 
                into structured, actionable intelligence, helping teams move directly 
                toward execution and accountability.
              </p>
            </div>
            <div style={styles.missionCardList}>
              <div style={styles.missionCard}>
                <Target color={theme.colors.primary} size={24} />
                <span>Focus on Execution</span>
              </div>
              <div style={styles.missionCard}>
                <Users color={theme.colors.primary} size={24} />
                <span>Team Accountability</span>
              </div>
              <div style={styles.missionCard}>
                <MessageSquare color={theme.colors.primary} size={24} />
                <span>Transparent History</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    backgroundColor: theme.colors.bgMain,
    color: "white",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 5%",
  },
  heroSection: {
    padding: "160px 5%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  heroTag: {
    fontSize: "0.9rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "3px",
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    padding: "8px 24px",
    borderRadius: theme.radius.full,
    border: `1px solid ${theme.colors.primary}33`,
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.lg,
    maxWidth: "1000px",
    letterSpacing: "-2px",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    color: theme.colors.textSecondary,
    maxWidth: "700px",
    margin: "0 auto 48px auto",
    lineHeight: 1.6,
  },
  heroBtns: {
    display: "flex",
    gap: theme.spacing.md,
    justifyContent: "center",
  },
  btnPrimary: {
    padding: "18px 40px",
    fontSize: "1.1rem",
    fontWeight: 700,
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.4)",
  },
  featuresGrid: {
    display: "flex",
    gap: "32px",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "80px 0",
  },
  featureCard: {
    flex: "1 1 300px",
    padding: "48px",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    borderRadius: theme.radius.lg,
    ...theme.effects.glass,
  },
  featureIconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.colors.primary}33`,
  },
  featureTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "12px",
  },
  featureDesc: {
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "center",
  },
  missionCardList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  missionCard: {
    ...theme.effects.glass,
    borderRadius: theme.radius.md,
    padding: "20px",
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
};
