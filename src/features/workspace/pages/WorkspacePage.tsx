import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
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
  getDocs,
  serverTimestamp,
  updateDoc,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { askQuestion, extractMeetingInsights } from "@/services/ai";

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
  const [messages, setMessages] = useState<
    { type: "ai" | "user"; text: string; reference?: string }[]
  >([]);
  const [intelligence, setIntelligence] = useState<IntelligenceData | null>(
    null,
  );
  const [conversations, setConversations] = useState<any[]>([]);
  const [chatQuery, setChatQuery] = useState("");
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsInitialLoading(true);
        const convs = await fetchConversations();
        if (convs) {
          setConversations(convs);
          if (convs.length > 0 && !activeConversation) {
            setActiveConversation(convs[0]);
            const chats = await fetchChats();
            if (chats) {
              console.log("Chats:", chats);
            }
          }
        }
        setIsInitialLoading(false);
      } else {
        setConversations([]);
        setIsInitialLoading(false);
        navigate("/login");
      }
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      setTranscript(activeConversation.transcript);
      if (activeConversation.summary) {
        setIntelligence({
          goal: activeConversation.goal || "",
          decisions: activeConversation.decisions || [],
          actions: activeConversation.actions || [],
          issues: activeConversation.issues || [],
          summary: activeConversation.summary || "",
          highlights: activeConversation.highlights || [],
        });
      } else {
        setIntelligence(null);
      }
    }
  }, [activeConversation]);

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
      .filter(
        (line) =>
          !line.includes("-->") &&
          !line.includes("WEBVTT") &&
          line.trim() !== "",
      )
      .join("\n");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        let text = event.target?.result as string;
        if (file.name.endsWith(".vtt")) {
          text = parseVTT(text);
        }

        setTranscript(text);
        setIsAnalyzing(true);

        try {
          const docId = await handleCreateFirebaseConversation(file, text);
          const aiResult = await extractMeetingInsights(text);

          setIntelligence(aiResult);
          setMessages([
            {
              type: "ai",
              text: `Analysis complete! I've extracted the meeting's goal, actions, and key decisions. How can I help you further?`,
            },
          ]);

          if (docId) {
            await handleUpdateFirebaseConversation(docId, aiResult);
            // Refresh conversations and set the new one as active
            const updatedConvs = await fetchConversations();
            if (updatedConvs && updatedConvs.length > 0) {
              const currentNew = updatedConvs.find((c) => c.id === docId);
              if (currentNew) {
                setActiveConversation(currentNew);
              }
            }
          }
        } catch (error) {
          console.error("Analysis failed:", error);
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsText(file);
    }
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

  const handleUpdateFirebaseConversation = async (
    docId: string,
    data: IntelligenceData,
  ) => {
    try {
      await updateDoc(doc(db, "conversations", docId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Firebase Update Error:", error);
    }
  };

  const fetchConversations = async () => {
    try {
      console.log("Function Called");
      if (!auth.currentUser) {
        console.log("No User", auth.currentUser);
        return [];
      }
      const q = query(
        collection(db, "conversations"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const convs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Conversations fetched:", convs);
      setConversations(convs);
      return convs;
    } catch (error) {
      console.error("Firebase Error:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;

    setMessages([...messages, { type: "user", text: chatQuery }]);
    setChatQuery("");

    console.log("HandleSendMessage Function is running");
    // AI Chat implementation for context-aware queries
    if (!transcript) {
      console.log("No transcript");
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Please upload a transcript first.",
        },
      ]);
      return;
    }
    console.log("Waiting for response from ai");
    setIsChatLoading(true);
    try {
      const answer = await askQuestion(transcript, chatQuery);
      console.log("AI Response done");
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: answer.answer,
          reference: answer.reference,
        },
      ]);
      console.log("Active Conversation", activeConversation);
      if (activeConversation?.id) {
        saveChat({
          conversationId: activeConversation.id,
          question: chatQuery,
          answer: answer.answer,
          reference: answer.reference,
        });
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "I'm sorry, I couldn't process your question at this time.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const saveChat = async ({
    conversationId,
    question,
    answer,
    reference,
  }: {
    conversationId: string;
    question: string;
    answer: string;
    reference: string;
  }) => {
    try {
      if (!auth.currentUser) {
        console.log("No user");
        return;
      }
      console.log("Conversation ID", conversationId);
      console.log("Question", question);
      console.log("Answer", answer);
      console.log("Reference", reference);
      const docRef = await addDoc(
        collection(db, "chatHistory", conversationId, "chats"),
        {
          question,
          answer,
          reference,
          createdAt: serverTimestamp(),
        },
      );
      console.log("Chat history stored with ID:", docRef.id);
    } catch (error) {
      console.error("Firebase Error:", error);
    }
  };

  const fetchChats = async () => {
    try {
      if (!auth.currentUser) {
        console.log("No user");
        return;
      }
      const q = query(
        collection(db, "conversations", activeConversation?.id, "chats"),
        orderBy("createdAt", "asc"),
      );
      const querySnapshot = await getDocs(q);
      const chats = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Chats:", chats);
      return chats;
    } catch (error) {
      console.log("error occured", error);
    }
  };

  return (
    <div style={styles.page}>
      <WorkspaceSidebar
        conversations={conversations}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        isLoading={isInitialLoading}
        onLogout={handleLogout}
        onNewSession={() => {
          setTranscript(null);
          setMessages([]);
          setIntelligence(null);
          setActiveConversation(null);
        }}
      />

      <main style={styles.main}>
        <TranscriptHub
          title={activeConversation?.title || "New Session"}
          transcript={transcript}
          fileInputRef={fileInputRef}
          onFileUpload={handleFileUpload}
          intelligenceData={intelligence}
          isAnalyzing={isAnalyzing}
        />

        <IntelligenceChat
          transcript={transcript}
          messages={messages}
          query={chatQuery}
          onQueryChange={setChatQuery}
          onSendMessage={handleSendMessage}
          isTyping={isChatLoading}
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
    overflow: "hidden", // Added this to prevent the whole layout from expanding
    maxHeight: "100vh", // Added this
  },
};
