import { Upload, Loader2, Sparkles, FileText } from "lucide-react";
import { theme } from "@/constants/theme";
import { IntelligenceSummary } from "./IntelligenceSummary";

interface Action {
  person: string;
  task: string;
  deadline: string;
}

interface Issue {
  issue: string;
  raisedBy: string;
}

interface IntelligenceData {
  goal: string;
  decisions: string[];
  actions: Action[];
  issues: Issue[];
  summary: string;
  highlights: string[];
}

interface TranscriptHubProps {
  title: string;
  transcript: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  intelligenceData: IntelligenceData | null;
  isAnalyzing: boolean;
}

export const TranscriptHub = ({
  title,
  transcript,
  fileInputRef,
  onFileUpload,
  intelligenceData,
  isAnalyzing,
}: TranscriptHubProps) => (
  <section style={styles.transcriptSection}>
    {!transcript ? (
      <div style={styles.uploadArea}>
        <div
          style={{ ...styles.uploadCard, ...theme.effects.glass }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div style={styles.uploadIcon}>
              <Upload size={32} color={theme.colors.primary} />
            </div>
          </div>
          <h3>Analyze Transcript</h3>
          <p style={{ color: theme.colors.textSecondary }}>
            Choose a .txt or .vtt file to extract intelligence.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".txt,.vtt"
            onChange={onFileUpload}
          />
        </div>
      </div>
    ) : (
      <>
        <header style={styles.transcriptHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <FileText size={24} color={theme.colors.primary} />
            <h2
              style={{
                ...theme.effects.gradientText,
                fontSize: "1.75rem",
                fontWeight: 800,
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>
          {isAnalyzing && (
            <div style={styles.analyzingBadge}>
              <Loader2
                size={16}
                className="animate-spin"
                style={{ animation: "spin 1s linear infinite" }}
              />
              <span>AI is analyzing...</span>
            </div>
          )}
        </header>

        <div style={styles.transcriptContainer}>
          <div style={{ ...styles.transcriptDisplay, ...theme.effects.glass }}>
            <div style={styles.displayHeader}>
              <h4 style={styles.rawTitle}>RAW TRANSCRIPT</h4>
              {isAnalyzing ? (
                <span style={styles.statusIndicator}>
                  <Sparkles size={12} /> Processing Insights
                </span>
              ) : (
                <span style={styles.statusIndicator}>Ready</span>
              )}
            </div>
            <div style={styles.scrollArea}>{transcript}</div>
          </div>

          {isAnalyzing ? (
            <div style={styles.loadingPlaceholder}>
              <Loader2
                size={32}
                color={theme.colors.primary}
                style={{ animation: "spin 1s linear infinite" }}
              />
              <p
                style={{ marginTop: "16px", color: theme.colors.textSecondary }}
              >
                Extracting decisions and action items...
              </p>
            </div>
          ) : (
            <IntelligenceSummary data={intelligenceData} title={title} />
          )}
        </div>
      </>
    )}
  </section>
);

const styles: Record<string, React.CSSProperties> = {
  transcriptSection: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    scrollbarColor: `${theme.colors.borderGlass} transparent`,
  },
  uploadArea: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadCard: {
    width: "100%",
    maxWidth: "600px",
    padding: "60px 40px",
    borderRadius: theme.radius.lg,
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  uploadIcon: {
    width: "64px",
    height: "64px",
    borderRadius: theme.radius.md,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  transcriptHeader: {
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transcriptContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  transcriptDisplay: {
    padding: "32px",
    borderRadius: theme.radius.lg,
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
    backgroundColor: "rgba(10, 15, 25, 0.4)",
    display: "flex",
    flexDirection: "column",
  },
  rawTitle: {
    fontSize: "0.7rem",
    fontWeight: 800,
    letterSpacing: "1.5px",
    color: theme.colors.textMuted,
    margin: 0,
    textTransform: "uppercase",
  },
  displayHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  statusIndicator: {
    fontSize: "0.75rem",
    color: theme.colors.secondary,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: "4px 12px",
    borderRadius: "20px",
    fontWeight: 600,
  },
  scrollArea: {
    maxHeight: "300px",
    overflowY: "auto",
    paddingRight: "10px",
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.colors.borderGlass} transparent`,
  },
  analyzingBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    color: theme.colors.primary,
    padding: "6px 16px",
    borderRadius: "30px",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  loadingPlaceholder: {
    ...theme.effects.glass,
    height: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.lg,
  },
};
