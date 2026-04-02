import { MessageSquare, Send } from "lucide-react";
import { theme } from "@/constants/theme";

interface Message {
  type: 'ai' | 'user';
  text: string;
}

interface IntelligenceChatProps {
  transcript: string | null;
  messages: Message[];
  query: string;
  onQueryChange: (val: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

export const IntelligenceChat = ({ 
  transcript, 
  messages, 
  query, 
  onQueryChange, 
  onSendMessage 
}: IntelligenceChatProps) => (
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

        <form onSubmit={onSendMessage} style={styles.chatInputWrapper}>
          <input 
            style={styles.chatInput} 
            placeholder="Ask a question..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
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
);

const styles: Record<string, React.CSSProperties> = {
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
