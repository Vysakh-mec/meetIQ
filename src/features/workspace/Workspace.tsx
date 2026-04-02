import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  MessageSquare,
  Send,
  Upload,
  ChevronRight,
  Brain,
  LogOut,
  FileText,
} from "lucide-react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import "./Workspace.css";

export const Workspace = () => {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { type: "ai" | "user"; text: string }[]
  >([]);
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
        setMessages([
          {
            type: "ai",
            text: "Hello! I've analyzed your meeting transcript. How can I help you extract intelligence from it?",
          },
        ]);
      };
      reader.readAsText(file);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages([...messages, { type: "user", text: query }]);
    setQuery("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "I'm processing that question based on the transcript above. (AI Engine pending integration...)",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="workspace-page">
      {/* Sidebar */}
      <aside className="workspace-sidebar">
        <header className="sidebar-header">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Brain size={28} className="logo-icon" />
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>meetIQ</h2>
            </div>
          </Link>
          <button
            className="new-btn"
            onClick={() => {
              setTranscript(null);
              setMessages([]);
            }}
          >
            <Plus size={18} /> New Session
          </button>
        </header>

        <div className="sidebar-scroll">
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginBottom: "12px",
              paddingLeft: "8px",
            }}
          >
            RECENT SESSIONS
          </p>
          <div className="sidebar-item active">
            <FileText size={18} />
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Quarterly Review.txt
            </span>
            <ChevronRight
              size={14}
              style={{ marginLeft: "auto", opacity: 0.5 }}
            />
          </div>
          {/* Repeat dummy sessions */}
          <div className="sidebar-item">
            <FileText size={18} />
            <span>Project Kickoff.txt</span>
          </div>
        </div>

        <button
          className="sidebar-item"
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            background: "transparent",
            border: "none",
            width: "100%",
          }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Workspace */}
      <main className="workspace-main">
        {/* Left: Transcript Area */}
        <section className="transcript-section">
          {!transcript ? (
            <div className="upload-area">
              <div
                className="upload-card glass glass-hover"
                onClick={() => fileInputRef.current?.click()}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    className="feature-icon-wrapper"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <Upload size={32} />
                  </div>
                </div>
                <h3>Drop your transcript here</h3>
                <p>Support for .txt files. Or click to browse.</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".txt"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          ) : (
            <>
              <header
                style={{
                  marginBottom: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 className="gradient-text" style={{ fontSize: "1.75rem" }}>
                  Active Transcript
                </h2>
                <span
                  style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
                >
                  Analyzed with meeting intelligence
                </span>
              </header>
              <div className="transcript-display glass">{transcript}</div>
            </>
          )}
        </section>

        {/* Right: Chat / Intelligence Area */}
        <section className="chat-section">
          {transcript && (
            <>
              <div className="chat-history">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`message ${m.type === "ai" ? "message-ai" : "message-user"}`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-wrapper">
                <input
                  className="chat-input"
                  placeholder="Ask a question about this meeting..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="send-btn">
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
          {!transcript && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.3,
                textAlign: "center",
              }}
            >
              <MessageSquare size={48} style={{ marginBottom: "16px" }} />
              <p>
                Upload a transcript to start
                <br />
                asking questions.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
