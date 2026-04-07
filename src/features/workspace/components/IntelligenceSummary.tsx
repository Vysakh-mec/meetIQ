import { useState } from "react";
import { theme } from "@/constants/theme";
import {
  CheckCircle2,
  Clock,
  User,
  Target,
  AlertCircle,
  ListChecks,
  Sparkles,
  Info,
  FileSpreadsheet,
  FileText as FilePdf,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Action {
  person: string;
  task: string;
  deadline: string | null;
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
  title?: string;
}

export const IntelligenceSummary = ({
  data,
  title = "Meeting Summary",
}: IntelligenceSummaryProps) => {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  if (!data) return null;

  const exportToCSV = () => {
    const csvRows = [];

    // Header
    csvRows.push(`Meeting Goal,"${data.goal.replace(/"/g, '""')}"`);
    csvRows.push("");

    // Summary
    csvRows.push(`Executive Summary,"${data.summary.replace(/"/g, '""')}"`);
    csvRows.push("");

    // Decisions
    csvRows.push("Key Decisions");
    data.decisions.forEach((d) => csvRows.push(`,"${d.replace(/"/g, '""')}"`));
    csvRows.push("");

    // Action Items
    csvRows.push("Action Items");
    csvRows.push("Task,Assignee,Deadline");
    data.actions.forEach((a) =>
      csvRows.push(
        `"${a.task.replace(/"/g, '""')}","${a.person.replace(/"/g, '""')}","${(a.deadline && a.deadline !== "null" ? a.deadline : "Not mentioned").replace(/"/g, '""')}"`,
      ),
    );
    csvRows.push("");

    // Issues
    if (data.issues.length > 0) {
      csvRows.push("Issues & Concerns");
      csvRows.push("Description,Raised By");
      data.issues.forEach((i) =>
        csvRows.push(
          `"${i.issue.replace(/"/g, '""')}","${i.raisedBy.replace(/"/g, '""')}"`,
        ),
      );
    }

    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${title.replace(/\s+/g, "_")}_insights.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(22);
    doc.setTextColor(59, 130, 246); // Primary blue
    doc.text("MeetIQ Intelligence Report", 14, 22);

    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139); // Text muted
    doc.text(title, 14, 30);

    doc.setDrawColor(226, 232, 240);
    doc.line(14, 35, pageWidth - 14, 35);

    // Goal
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("MEETING GOAL", 14, 45);
    doc.setFont("helvetica", "normal");
    const goalLines = doc.splitTextToSize(
      data.goal || "No specific goal mentioned.",
      pageWidth - 28,
    );
    doc.text(goalLines, 14, 52);

    let currentY = 52 + goalLines.length * 7 + 10;

    // Summary
    doc.setFont("helvetica", "bold");
    doc.text("EXECUTIVE SUMMARY", 14, currentY);
    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(data.summary, pageWidth - 28);
    doc.text(summaryLines, 14, currentY + 7);

    currentY += summaryLines.length * 7 + 15;

    // Decisions
    if (data.decisions.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("KEY DECISIONS", 14, currentY);
      currentY += 7;
      doc.setFont("helvetica", "normal");
      data.decisions.forEach((d) => {
        const dLines = doc.splitTextToSize(`• ${d}`, pageWidth - 32);
        doc.text(dLines, 18, currentY);
        currentY += dLines.length * 7;
      });
      currentY += 10;
    }

    // Action Items Table
    autoTable(doc, {
      startY: currentY,
      head: [["Task", "Assignee", "Deadline"]],
      body: data.actions.map((a) => [
        a.task,
        a.person,
        a.deadline && a.deadline !== "null" ? a.deadline : "Not mentioned",
      ]),
      theme: "striped",
      headStyles: { fillColor: [59, 130, 246] },
      margin: { top: 10 },
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;

    // Issues Table
    if (data.issues.length > 0) {
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text("ISSUES & CONCERNS", 14, currentY);
      currentY += 5;

      autoTable(doc, {
        startY: currentY,
        head: [["Description", "Raised By"]],
        body: data.issues.map((i) => [i.issue, i.raisedBy]),
        theme: "striped",
        headStyles: { fillColor: [239, 68, 68] },
      });
    }

    doc.save(`${title.replace(/\s+/g, "_")}_insights.pdf`);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.exportControls}>
        <h2
          style={{
            ...theme.effects.gradientText,
            margin: 0,
            fontSize: "1.25rem",
          }}
        >
          Meeting Insights
        </h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              ...styles.exportButton,
              backgroundColor:
                hoveredBtn === "csv"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.05)",
              transform: hoveredBtn === "csv" ? "translateY(-1px)" : "none",
              boxShadow:
                hoveredBtn === "csv" ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
            }}
            onClick={exportToCSV}
            onMouseEnter={() => setHoveredBtn("csv")}
            onMouseLeave={() => setHoveredBtn(null)}
            title="Export as CSV"
          >
            <FileSpreadsheet size={16} />
            <span>CSV</span>
          </button>
          <button
            style={{
              ...styles.exportButton,
              background:
                hoveredBtn === "pdf"
                  ? theme.colors.primaryAlt
                  : "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              border: "none",
              transform: hoveredBtn === "pdf" ? "translateY(-1px)" : "none",
              boxShadow:
                hoveredBtn === "pdf"
                  ? "0 4px 12px rgba(59, 130, 246, 0.3)"
                  : "none",
            }}
            onClick={exportToPDF}
            onMouseEnter={() => setHoveredBtn("pdf")}
            onMouseLeave={() => setHoveredBtn(null)}
            title="Export as PDF"
          >
            <FilePdf size={16} color="white" />
            <span style={{ color: "white" }}>PDF Report</span>
          </button>
        </div>
      </div>

      {/* 1. Header & Summary Section */}
      <div style={styles.mainCard}>
        <div style={styles.sectionHeader}>
          <Target size={20} color={theme.colors.primary} />
          <h3 style={styles.sectionTitle}>Meeting Goal</h3>
        </div>
        <p style={styles.goalText}>
          {data.goal || "No specific goal mentioned."}
        </p>

        <div style={{ ...styles.sectionHeader, marginTop: "24px" }}>
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
              <li key={i} style={styles.listItem}>
                {d}
              </li>
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
              <li key={i} style={styles.listItem}>
                {h}
              </li>
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
                    <div style={styles.iconCell}>
                      <User size={14} /> {action.person}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.iconCell}>
                      <Clock size={14} />{" "}
                      {action.deadline && action.deadline !== "null"
                        ? action.deadline
                        : "Not mentioned"}
                    </div>
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
                      <div style={styles.iconCell}>
                        <User size={14} /> {issue.raisedBy}
                      </div>
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
  exportControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  exportButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: theme.radius.md,
    height: "40px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
    transition: "all 0.2s",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: `1px solid ${theme.colors.borderGlass}`,
    color: theme.colors.textSecondary,
    outline: "none",
  },
};
