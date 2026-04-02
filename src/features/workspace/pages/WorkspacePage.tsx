import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase";
import { theme } from "@/constants/theme";
import { WorkspaceSidebar } from "../components/WorkspaceSidebar";
import { TranscriptHub } from "../components/TranscriptHub";
import { IntelligenceChat } from "../components/IntelligenceChat";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { extractMeetingInsights } from "@/services/ai";

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

export const WorkspacePage = () => {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ type: "ai" | "user"; text: string }[]>([]);
  const [intelligence, setIntelligence] = useState<IntelligenceData | null>(null);
  const [query, setQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const parseVTT = (text: string) => {
    return text
      .split("\n")
      .filter(line => !line.includes("-->") && !line.includes("WEBVTT") && line.trim() !== "")
      .join("\n");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        let text = event.target?.result as string;
        if (file.name.endsWith('.vtt')) {
          text = parseVTT(text);
        }
        
        setTranscript(text);
        
        try {
          const docId = await handleCreateFirebaseConversation(file, text);
          const aiResult = await extractMeetingInsights(text);
          
          setIntelligence(aiResult);
          setMessages([{ 
            type: "ai", 
            text: `Analysis complete! I've extracted the meeting's goal, actions, and key decisions. How can I help you further?` 
          }]);

          if (docId) {
            handleUpdateFirebaseConversation(docId, aiResult);
          }
        } catch (error) {
          console.error("Analysis failed:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages([...messages, { type: "user", text: query }]);
    setQuery("");
    
    // AI Chat implementation for context-aware queries
    setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: "ai", 
          text: "I am ready to help with your questions about this transcript. (Chat integration pending...)" 
        }]);
    }, 1000);
  };

  const handleCreateFirebaseConversation = async (file: File, text: string) => {
    try {
      const docRef = await addDoc(collection(db, "conversations"), {
        userId: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
        title: file.name,
        transcript: text,
        fileType: file.type,
      });
      return docRef.id;
    } catch (error) {
      console.error("Firebase Error:", error);
    }
  };

  const handleUpdateFirebaseConversation = async (docId: string, data: IntelligenceData) => {
    try {
      await updateDoc(doc(db, "conversations", docId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Firebase Update Error:", error);
    }
  };

  return (
    <div style={styles.page}>
      <WorkspaceSidebar 
        onLogout={handleLogout} 
        onNewSession={() => { 
          setTranscript(null); 
          setMessages([]); 
          setIntelligence(null);
        }} 
      />
      
      <main style={styles.main}>
        <TranscriptHub 
          transcript={transcript}
          fileInputRef={fileInputRef}
          onFileUpload={handleFileUpload}
          intelligenceData={intelligence}
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
