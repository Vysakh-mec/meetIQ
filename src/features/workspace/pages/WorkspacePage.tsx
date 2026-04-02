import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { theme } from "@/constants/theme";
import { WorkspaceSidebar } from "../components/WorkspaceSidebar";
import { TranscriptHub } from "../components/TranscriptHub";
import { IntelligenceChat } from "../components/IntelligenceChat";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export const WorkspacePage = () => {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { type: "ai" | "user"; text: string }[]
  >([]);
  const [query, setQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const session = useSelector((state: RootState) => state.auth);
  console.log("Session ::", session);

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
    <div style={styles.page}>
      <WorkspaceSidebar
        onLogout={handleLogout}
        onNewSession={() => {
          setTranscript(null);
          setMessages([]);
        }}
      />

      <main style={styles.main}>
        <TranscriptHub
          transcript={transcript}
          fileInputRef={fileInputRef}
          onFileUpload={handleFileUpload}
        />

        <IntelligenceChat
          transcript={transcript}
          messages={messages}
          query={query}
          onQueryChange={setQuery}
          onSendMessage={handleSendMessage}
        />
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
  main: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    backgroundImage: `radial-gradient(at top left, ${theme.colors.primary}0D 0%, transparent 50%)`,
  },
};
