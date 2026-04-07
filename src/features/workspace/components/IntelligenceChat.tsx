import { useRef, useEffect } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { theme } from "@/constants/theme";

interface Message {
  type: "ai" | "user";
  text: string;
  reference?: string;
}

interface IntelligenceChatProps {
  transcript: string | null;
  messages: Message[];
  query: string;
  onQueryChange: (val: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isTyping?: boolean;
}

export const IntelligenceChat = ({
  transcript,
  messages,
  query,
  onQueryChange,
  onSendMessage,
  isTyping,
}: IntelligenceChatProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <section style={styles.chatSection}>
      {transcript && (
        <>
          <div style={styles.chatHistory} ref={scrollRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  ...(m.type === "ai" ? styles.messageAi : styles.messageUser),
                }}
              >
                <div>{m.text}</div>
                {m.reference && (
                  <div style={styles.reference}>
                    <span style={{ fontWeight: 700, fontSize: "0.65rem" }}>
                      REFERENCE:
                    </span>
                    <p style={{ margin: "4px 0 0", fontStyle: "italic" }}>
                      "{m.reference}"
                    </p>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div
                style={{
                  ...styles.message,
                  ...styles.messageAi,
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <Loader2
                  size={14}
                  className="animate-spin"
                  style={{ animation: "spin 1s linear infinite" }}
                />
                <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                  Thinking...
                </span>
              </div>
            )}
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
          <MessageSquare
            size={48}
            style={{ marginBottom: "16px", opacity: 0.3 }}
          />
          <p style={{ opacity: 0.5 }}>
            Upload a transcript to start
            <br />
            asking questions.
          </p>
        </div>
      )}
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  chatSection: {
    backgroundColor: "rgba(10, 15, 25, 0.5)",
    borderLeft: `1px solid ${theme.colors.borderGlass}`,
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    paddingRight: 0,
    minHeight: 0, // This is key for grid/flex items to scroll
    maxHeight: "100vh",
    scrollbarColor: `${theme.colors.bgGlass} transparent`,
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
    marginRight: "12px",
  },
  reference: {
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: `1px solid ${theme.colors.borderGlass}`,
    fontSize: "0.75rem",
    color: theme.colors.textMuted,
  },
  chatInputWrapper: {
    display: "flex",
    gap: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: `1px solid ${theme.colors.borderGlass}`,
    borderRadius: theme.radius.md,
    padding: "8px",
    marginRight: "20px",
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
