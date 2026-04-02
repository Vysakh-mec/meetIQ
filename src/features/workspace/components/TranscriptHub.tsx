import { Upload } from "lucide-react";
import { theme } from "@/constants/theme";

interface TranscriptHubProps {
  transcript: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TranscriptHub = ({ transcript, fileInputRef, onFileUpload }: TranscriptHubProps) => (
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
          <h3>Drop your transcript here</h3>
          <p style={{ color: theme.colors.textSecondary }}>Support for .txt files. Or click to browse.</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".txt"
            onChange={onFileUpload} 
          />
        </div>
      </div>
    ) : (
      <>
        <header style={styles.transcriptHeader}>
          <h2 style={{ ...theme.effects.gradientText, fontSize: '1.75rem', fontWeight: 800 }}>Active Transcript</h2>
          <span style={{ fontSize: '0.85rem', color: theme.colors.textMuted }}>Analyzed with meeting intelligence</span>
        </header>
        <div style={{ ...styles.transcriptDisplay, ...theme.effects.glass }}>
          {transcript}
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
  transcriptDisplay: {
    padding: "40px",
    borderRadius: theme.radius.lg,
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
    flex: 1,
  },
};
