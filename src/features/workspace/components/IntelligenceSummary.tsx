import { theme } from "@/constants/theme";
import { 
  CheckCircle2, 
  Clock, 
  User, 
  Target, 
  AlertCircle, 
  ListChecks, 
  Sparkles,
  Info
} from "lucide-react";

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

interface IntelligenceSummaryProps {
  data: IntelligenceData | null;
}

export const IntelligenceSummary = ({ data }: IntelligenceSummaryProps) => {
  if (!data) return null;

  return (
    <div style={styles.wrapper}>
      {/* 1. Header & Summary Section */}
      <div style={styles.mainCard}>
        <div style={styles.sectionHeader}>
            <Target size={20} color={theme.colors.primary} />
            <h3 style={styles.sectionTitle}>Meeting Goal</h3>
        </div>
        <p style={styles.goalText}>{data.goal || "No specific goal mentioned."}</p>
        
        <div style={{ ...styles.sectionHeader, marginTop: '24px' }}>
            <Info size={20} color={theme.colors.secondary} />
            <h3 style={styles.sectionTitle}>Executive Summary</h3>
        </div>
        <p style={styles.summaryText}>{data.summary}</p>
      </div>

      <div style={styles.grid}>
        {/* 2. Decisions List */}
        <div style={styles.gridItem}>
          <div style={styles.sectionHeader}>
            <CheckCircle2 size={20} color={theme.colors.accent} />
            <h3 style={styles.sectionTitle}>Key Decisions</h3>
          </div>
          <ul style={styles.list}>
            {data.decisions.map((d, i) => (
              <li key={i} style={styles.listItem}>{d}</li>
            ))}
          </ul>
        </div>

        {/* 3. Highlights */}
        <div style={styles.gridItem}>
          <div style={styles.sectionHeader}>
            <Sparkles size={20} color="#fcd34d" />
            <h3 style={styles.sectionTitle}>Notable Highlights</h3>
          </div>
          <ul style={styles.list}>
            {data.highlights.map((h, i) => (
              <li key={i} style={styles.listItem}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Action Items Table */}
      <div style={styles.tableSection}>
        <div style={styles.sectionHeader}>
          <ListChecks size={20} color={theme.colors.primary} />
          <h3 style={styles.sectionTitle}>Action Items</h3>
        </div>
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Task</th>
                <th style={styles.th}>Assignee</th>
                <th style={styles.th}>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {data.actions.map((action, i) => (
                <tr key={i} style={styles.tr}>
                  <td style={styles.td}>{action.task}</td>
                  <td style={styles.td}>
                    <div style={styles.iconCell}><User size={14} /> {action.person}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.iconCell}><Clock size={14} /> {action.deadline || "TBD"}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Issues Raised */}
      {data.issues.length > 0 && (
        <div style={styles.tableSection}>
          <div style={styles.sectionHeader}>
            <AlertCircle size={20} color="#ef4444" />
            <h3 style={styles.sectionTitle}>Issues & Concerns</h3>
          </div>
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Raised By</th>
                </tr>
              </thead>
              <tbody>
                {data.issues.map((issue, i) => (
                  <tr key={i} style={styles.tr}>
                    <td style={styles.td}>{issue.issue}</td>
                    <td style={styles.td}>
                      <div style={styles.iconCell}><User size={14} /> {issue.raisedBy}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: theme.spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    paddingBottom: "80px",
  },
  mainCard: {
    ...theme.effects.glass,
    padding: "32px",
    borderRadius: theme.radius.lg,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: 0,
  },
  goalText: {
    fontSize: "1.25rem",
    fontWeight: 500,
    color: "white",
    lineHeight: 1.4,
  },
  summaryText: {
    color: theme.colors.textSecondary,
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  gridItem: {
    ...theme.effects.glass,
    padding: "24px",
    borderRadius: theme.radius.md,
  },
  list: {
    margin: 0,
    paddingLeft: "20px",
    color: theme.colors.textSecondary,
  },
  listItem: {
    marginBottom: "8px",
    fontSize: "0.95rem",
  },
  tableSection: {
    display: "flex",
    flexDirection: "column",
  },
  tableCard: {
    borderRadius: theme.radius.md,
    overflow: "hidden",
    border: `1px solid ${theme.colors.borderGlass}`,
    backgroundColor: "rgba(255, 255, 255, 0.01)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: theme.colors.textMuted,
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  tr: {
    borderBottom: `1px solid ${theme.colors.borderGlass}`,
  },
  td: {
    padding: "16px",
    fontSize: "0.95rem",
    color: theme.colors.textPrimary,
  },
  iconCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: theme.colors.textSecondary,
  },
};
