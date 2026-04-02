import { Upload } from "lucide-react";
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
  transcript: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  intelligenceData: IntelligenceData | null;
}

export const TranscriptHub = ({ 
  transcript, 
  fileInputRef, 
  onFileUpload,
  intelligenceData
}: TranscriptHubProps) => (
  <section style={styles.transcriptSection}>
    {!transcript ? (
      <div style={styles.uploadArea}>
        <div 
          style={{ ...styles.uploadCard, ...theme.effects.glass }} 
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={styles.uploadIcon}>
              <Upload size={32} color={theme.colors.primary} />
            </div>
          </div>
          <h3>Analyze Transcript</h3>
          <p style={{ color: theme.colors.textSecondary }}>Choose a .txt or .vtt file to extract intelligence.</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".txt,.vtt"
            onChange={onFileUpload} 
          />
        </div>
      </div>
    ) : (
      <>
        <header style={styles.transcriptHeader}>
          <h2 style={{ ...theme.effects.gradientText, fontSize: '1.75rem', fontWeight: 800 }}>Active Workspace</h2>
          <span style={{ fontSize: '0.85rem', color: theme.colors.textMuted }}>Meeting context and extracted insights</span>
        </header>
        
        <div style={{ ...styles.transcriptContainer }}>
          <div style={{ ...styles.transcriptDisplay, ...theme.effects.glass }}>
            <h4 style={styles.rawTitle}>RAW TRANSCRIPT</h4>
            {transcript}
          </div>
          
          <IntelligenceSummary data={intelligenceData} />
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
    padding: "40px",
    borderRadius: theme.radius.lg,
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
    backgroundColor: "rgba(10, 15, 25, 0.4)",
  },
  rawTitle: {
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "1px",
    color: theme.colors.textMuted,
    marginBottom: "20px",
  },
};
