import { Link } from "react-router-dom";
import {
  Plus,
  Brain,
  LogOut,
  FileText,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { theme } from "@/constants/theme";

interface SidebarProps {
  onLogout: () => void;
  onNewSession: () => void;
  conversations: any[];
  activeConversation: any;
  setActiveConversation: (conversation: any) => void;
  isLoading?: boolean;
}

export const WorkspaceSidebar = ({
  onLogout,
  onNewSession,
  conversations,
  activeConversation,
  setActiveConversation,
  isLoading,
}: SidebarProps) => (
  <aside style={styles.sidebar}>
    <header style={{ marginBottom: "32px" }}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Brain size={28} style={{ color: theme.colors.primary }} />
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>meetIQ</h2>
        </div>
      </Link>
      <button style={styles.newBtn} onClick={onNewSession}>
        <Plus size={18} /> New Session
      </button>
    </header>

    <div style={styles.sidebarScroll}>
      <p style={styles.sidebarLabel}>RECENT SESSIONS</p>
      {isLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Loader2
            size={24}
            color={theme.colors.primary}
            className="animate-spin"
            style={{ animation: "spin 1s linear infinite" }}
          />
        </div>
      ) : conversations.length === 0 ? (
        <p
          style={{
            ...styles.sidebarLabel,
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          No sessions yet
        </p>
      ) : (
        conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setActiveConversation(conversation)}
            style={{
              ...styles.sidebarItem,
              ...(activeConversation?.id === conversation.id
                ? styles.sidebarItemActive
                : {}),
            }}
          >
            <FileText size={18} />
            <span style={styles.sidebarItemTxt}>{conversation.title}</span>
            <ChevronRight
              size={14}
              style={{ marginLeft: "auto", opacity: 0.5 }}
            />
          </div>
        ))
      )}
    </div>

    <button style={styles.logoutBtn} onClick={onLogout}>
      <LogOut size={18} />
      <span>Sign Out</span>
    </button>
  </aside>
);

const styles: Record<string, React.CSSProperties> = {
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
};
