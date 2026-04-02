import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  MessageSquare, 
  Send, 
  Upload, 
  ChevronRight, 
  Brain, 
  LogOut, 
  FileText 
} from "lucide-react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { theme } from "@/constants/theme";

export const Workspace = () => {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ type: 'ai' | 'user', text: string }[]>([]);
  const [query, setQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTranscript(event.target?.result as string);
        setMessages([{ type: 'ai', text: "Hello! I've analyzed your meeting transcript. How can I help you extract intelligence from it?" }]);
      };
      reader.readAsText(file);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages([...messages, { type: 'user', text: query }]);
    setQuery("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', text: "I'm processing that question based on the transcript above. (AI Engine pending integration...)" }]);
    }, 1000);
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <header style={{ marginBottom: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Brain size={28} style={{ color: theme.colors.primary }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>meetIQ</h2>
            </div>
          </Link>
          <button style={styles.newBtn} onClick={() => { setTranscript(null); setMessages([]); }}>
            <Plus size={18} /> New Session
          </button>
        </header>

        <div style={styles.sidebarScroll}>
          <p style={styles.sidebarLabel}>RECENT SESSIONS</p>
          <div style={{ ...styles.sidebarItem, ...styles.sidebarItemActive }}>
            <FileText size={18} />
            <span style={styles.sidebarItemTxt}>Quarterly Review.txt</span>
            <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </div>
          <div style={styles.sidebarItem}>
            <FileText size={18} />
            <span style={styles.sidebarItemTxt}>Project Kickoff.txt</span>
          </div>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={18} /> 
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Workspace */}
      <main style={styles.main}>
        {/* Left: Transcript Area */}
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
                  onChange={handleFileUpload} 
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

        {/* Right: Chat / Intelligence Area */}
        <section style={styles.chatSection}>
          {transcript && (
            <>
              <div style={styles.chatHistory}>
                {messages.map((m, i) => (
                  <div key={i} style={{ 
                    ...styles.message, 
                    ...(m.type === 'ai' ? styles.messageAi : styles.messageUser) 
                  }}>
                    {m.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} style={styles.chatInputWrapper}>
                <input 
                  style={styles.chatInput} 
                  placeholder="Ask a question..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" style={styles.sendBtn}>
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
          {!transcript && (
            <div style={styles.chatEmpty}>
              <MessageSquare size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
              <p style={{ opacity: 0.5 }}>Upload a transcript to start<br/>asking questions.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    height: "100vh",
    backgroundColor: theme.colors.bgMain,
    color: "white",
    overflow: "hidden",
  },
  sidebar: {
    width: "280px",
    backgroundColor: "rgba(10, 15, 25, 0.95)",
    borderRight: `1px solid ${theme.colors.borderGlass}`,
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    backdropFilter: "blur(20px)",
  },
  newBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "16px",
    backgroundColor: theme.colors.bgAccent,
    border: `1px dashed ${theme.colors.borderGlass}`,
    borderRadius: theme.radius.md,
    color: theme.colors.primary,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
  },
  sidebarScroll: {
    flex: 1,
    overflowY: "auto",
    padding: "0 8px",
  },
  sidebarLabel: {
    fontSize: "0.75rem",
    color: theme.colors.textMuted,
    marginBottom: "12px",
    paddingLeft: "8px",
    letterSpacing: "1px",
  },
  sidebarItem: {
    width: "100%",
    padding: "12px",
    borderRadius: theme.radius.md,
    marginBottom: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: theme.colors.textSecondary,
    fontSize: "0.9rem",
    transition: "all 0.2s",
  },
  sidebarItemActive: {
    backgroundColor: theme.colors.bgAccent,
    color: "white",
  },
  sidebarItemTxt: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  logoutBtn: {
    marginTop: "auto",
    backgroundColor: "transparent",
    border: "none",
    color: theme.colors.textSecondary,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  main: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    backgroundImage: `radial-gradient(at top left, ${theme.colors.primary}0D 0%, transparent 50%)`,
  },
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
  chatSection: {
    backgroundColor: "rgba(10, 15, 25, 0.5)",
    borderLeft: `1px solid ${theme.colors.borderGlass}`,
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
  },
  chatHistory: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingBottom: "24px",
  },
  message: {
    padding: "12px 16px",
    borderRadius: "16px",
    maxWidth: "90%",
    fontSize: "0.95rem",
  },
  messageAi: {
    backgroundColor: theme.colors.bgAccent,
    border: `1px solid ${theme.colors.borderGlass}`,
    alignSelf: "flex-start",
  },
  messageUser: {
    backgroundColor: theme.colors.primary,
    color: "white",
    alignSelf: "flex-end",
  },
  chatInputWrapper: {
    display: "flex",
    gap: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: `1px solid ${theme.colors.borderGlass}`,
    borderRadius: theme.radius.md,
    padding: "8px",
  },
  chatInput: {
    flex: 1,
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    padding: "8px 12px",
    outline: "none",
  },
  sendBtn: {
    padding: "8px",
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: theme.radius.sm,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chatEmpty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
};
