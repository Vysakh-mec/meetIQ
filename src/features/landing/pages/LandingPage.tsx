import { useState } from "react";
import {
  Zap,
  CheckSquare,
  ArrowRight,
  MessageSquare,
  Target,
  Download,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@components/Navbar";
import { theme } from "@/constants/theme";

export const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Target size={24} style={{ color: theme.colors.primary }} />,
      title: "Goal Identification",
      desc: "Automatically extracts the primary objective of every meeting from raw transcripts.",
    },
    {
      icon: <FileText size={24} style={{ color: theme.colors.secondary }} />,
      title: "Executive Summaries",
      desc: "Get a concise, AI-generated summary of the entire conversation in seconds.",
    },
    {
      icon: <CheckSquare size={24} style={{ color: theme.colors.accent }} />,
      title: "Action Item Tracking",
      desc: "Identifies tasks, assigns owners, and flags deadlines to ensure accountability.",
    },
    {
      icon: <MessageSquare size={24} style={{ color: theme.colors.primary }} />,
      title: "Contextual Chat",
      desc: "Ask our AI anything about your past meetings and get instant, referenced answers.",
    },
    {
      icon: <Download size={24} style={{ color: theme.colors.secondary }} />,
      title: "Multi-Format Export",
      desc: "Export your meeting insights as professional PDF reports or structured CSV data.",
    },
    {
      icon: <Zap size={24} style={{ color: theme.colors.accent }} />,
      title: "Key Decisions",
      desc: "Never lose track of what was decided. We highlight every critical outcome.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Transcript",
      desc: "Simply upload your meeting recording or transcript. We support various formats.",
    },
    {
      number: "02",
      title: "AI Analysis",
      desc: "Our advanced models process the dialogue, identifying speakers and context.",
    },
    {
      number: "03",
      title: "Actionable Insights",
      desc: "Access structured summaries, tasks, and decisions in your dedicated workspace.",
    },
  ];

  const faqs = [
    {
      q: "What transcript formats do you support?",
      a: "We support standard text files, VTT, SRT, and common document formats like PDF and DOCX containing meeting notes.",
    },
    {
      q: "Can I ask questions about the meeting?",
      a: "Absolutely. The built-in chatbot allows you to ask natural language questions about the meeting, such as decisions made, issues discussed, or responsibilities assigned",
    },
    {
      q: "Can I export the extracted data?",
      a: "Yes, you can export the extracted data in various formats, including PDF and CSV.",
    },
  ];

  return (
    <div style={styles.appContainer}>
      <Navbar />

      {/* Hero Section */}
      <header style={styles.heroSection}>
        <div style={styles.backgroundBlur} />
        <span style={styles.heroTag}>Meeting Intelligence Hub</span>
        <h1 style={styles.heroTitle}>
          Turn your{" "}
          <span style={theme.effects.gradientText}>Conversations</span> into{" "}
          <span style={theme.effects.gradientText}>
            Actionable Intelligence
          </span>
          .
        </h1>
        <p style={styles.heroSubtitle}>
          Transform raw meeting transcripts into structured outcomes. meetIQ
          automatically extracts decisions and action items so your team can
          focus on execution.
        </p>
        <div style={styles.heroBtns}>
          <Link to="/signup" style={styles.btnPrimary}>
            Get Started Free <ArrowRight size={18} />
          </Link>
          <a href="#features" style={styles.btnSecondary}>
            View Features
          </a>
        </div>
      </header>

      {/* Real Features Grid */}
      <section id="features" style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitleMain}>
            Powerful <span style={theme.effects.gradientText}>Features</span>{" "}
            for Modern Teams
          </h2>
          <p style={styles.sectionSubtitle}>
            Our AI-driven platform handles the documentation so you can focus on
            the discussion.
          </p>
        </div>
        <div style={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={styles.featureIconWrapper}>{f.icon}</div>
              <div>
                <h3 style={styles.featureTitleSmall}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.howItWorks} id="how-it-works">
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitleMain}>
              How it <span style={theme.effects.gradientText}>Works</span>
            </h2>
          </div>
          <div style={styles.stepsGrid}>
            {steps.map((s, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepNumber}>{s.number}</div>
                <h3 style={styles.featureTitleSmall}>{s.title}</h3>
                <p style={styles.featureDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ ...styles.container, padding: "100px 0" }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitleMain}>Frequently Asked Questions</h2>
        </div>
        <div style={styles.faqList}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={styles.faqItem}
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
            >
              <div style={styles.faqQuestion}>
                <span>{faq.q}</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform:
                      activeFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                />
              </div>
              {activeFaq === i && <div style={styles.faqAnswer}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaBanner}>
        <div style={styles.container}>
          <div style={styles.ctaContent}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
              Ready to supercharge your meetings?
            </h2>
            <p style={{ ...styles.heroSubtitle, marginBottom: "32px" }}>
              Join thousands of teams who use meetIQ to drive better outcomes.
            </p>
            <Link
              to="/signup"
              style={{
                ...styles.btnPrimary,
                margin: "0 auto",
                width: "fit-content",
              }}
            >
              Get Started for Free <ArrowRight size={18} />
            </Link>
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
    fontFamily: "'Inter', sans-serif",
    overflowX: "hidden",
  },
  container: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 5%",
  },
  heroSection: {
    position: "relative",
    padding: "180px 5% 120px 5%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  backgroundBlur: {
    position: "absolute",
    top: "-100px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "800px",
    height: "600px",
    background:
      "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(5, 8, 15, 0) 70%)",
    zIndex: -1,
    filter: "blur(60px)",
  },
  heroTag: {
    fontSize: "0.85rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: theme.colors.primary,
    marginBottom: "24px",
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    padding: "8px 20px",
    borderRadius: theme.radius.full,
    border: `1px solid ${theme.colors.primary}33`,
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: 900,
    lineHeight: 1.05,
    marginBottom: "32px",
    maxWidth: "1100px",
    letterSpacing: "-2px",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: theme.colors.textSecondary,
    maxWidth: "800px",
    margin: "0 auto 48px auto",
    lineHeight: 1.6,
  },
  heroBtns: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  btnPrimary: {
    padding: "16px 36px",
    fontSize: "1.1rem",
    fontWeight: 700,
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    transition: "all 0.3s",
    boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.5)",
  },
  btnSecondary: {
    padding: "16px 36px",
    fontSize: "1.1rem",
    fontWeight: 700,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "white",
    borderRadius: theme.radius.md,
    textDecoration: "none",
    border: `1px solid ${theme.colors.borderGlass}`,
    transition: "all 0.3s",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionTitleMain: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    marginBottom: "20px",
    letterSpacing: "-1px",
  },
  sectionSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: "1.1rem",
    maxWidth: "700px",
    margin: "0 auto",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "24px",
    paddingBottom: "80px",
  },
  featureCard: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    borderRadius: theme.radius.lg,
    ...theme.effects.glass,
    transition: "transform 0.3s, border-color 0.3s",
    cursor: "default",
  },
  featureIconWrapper: {
    width: "56px",
    height: "56px",
    borderRadius: theme.radius.md,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.colors.borderGlass}`,
  },
  featureTitleSmall: {
    fontSize: "1.35rem",
    fontWeight: 700,
    marginBottom: "12px",
  },
  featureDesc: {
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
    fontSize: "0.95rem",
  },
  howItWorks: {
    backgroundColor: theme.colors.bgAccent,
    padding: "120px 0",
    margin: "80px 0",
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
  },
  stepCard: {
    textAlign: "center",
    padding: "32px",
  },
  stepNumber: {
    fontSize: "4rem",
    fontWeight: 900,
    color: "rgba(59, 130, 246, 0.1)",
    lineHeight: 1,
    marginBottom: "-20px",
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "32px",
    padding: "40px 0",
  },
  pricingCard: {
    padding: "48px 40px",
    borderRadius: theme.radius.xl,
    ...theme.effects.glass,
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  pricingCardHighligh: {
    border: `2px solid ${theme.colors.primary}`,
    backgroundColor: "rgba(59, 130, 246, 0.05)",
  },
  popularBadge: {
    position: "absolute",
    top: "24px",
    right: "24px",
    backgroundColor: theme.colors.primary,
    color: "white",
    fontSize: "0.75rem",
    fontWeight: 800,
    padding: "4px 12px",
    borderRadius: theme.radius.full,
    textTransform: "uppercase",
  },
  pricingName: {
    fontSize: "1.5rem",
    fontWeight: 800,
    marginBottom: "16px",
  },
  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
    marginBottom: "16px",
  },
  priceValue: {
    fontSize: "3rem",
    fontWeight: 800,
    color: "white",
  },
  pricePeriod: {
    color: theme.colors.textMuted,
    fontSize: "1rem",
  },
  pricingDesc: {
    color: theme.colors.textSecondary,
    marginBottom: "32px",
  },
  pricingFeaturesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "48px",
    flex: 1,
  },
  pricingFeatureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "0.95rem",
    color: theme.colors.textSecondary,
  },
  btnPricing: {
    width: "100%",
    padding: "16px",
    borderRadius: theme.radius.md,
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid",
    transition: "all 0.3s",
  },
  faqList: {
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  faqItem: {
    ...theme.effects.glass,
    borderRadius: theme.radius.lg,
    padding: "24px",
    cursor: "pointer",
  },
  faqQuestion: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  faqAnswer: {
    marginTop: "16px",
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
    paddingTop: "16px",
    borderTop: `1px solid ${theme.colors.borderGlass}`,
  },
  ctaBanner: {
    padding: "120px 0",
    textAlign: "center",
    background:
      "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
  },
  ctaContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  footer: {
    backgroundColor: theme.colors.bgAccent,
    padding: "80px 0 40px 0",
    borderTop: `1px solid ${theme.colors.borderGlass}`,
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "48px",
    marginBottom: "60px",
  },
  footerBrand: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  footerLinksGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  footerHeading: {
    fontSize: "1rem",
    fontWeight: 700,
    marginBottom: "8px",
  },
  footerLink: {
    color: theme.colors.textSecondary,
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "color 0.2s",
  },
  footerBottom: {
    paddingTop: "40px",
    borderTop: `1px solid ${theme.colors.borderGlass}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerCopy: {
    color: theme.colors.textMuted,
    fontSize: "0.9rem",
  },
  socialLinks: {
    display: "flex",
    gap: "24px",
  },
  socialIcon: {
    color: theme.colors.textMuted,
    cursor: "pointer",
    transition: "color 0.2s",
  },
};
