# meetIQ 🧠

**meetIQ** is an AI-powered meeting intelligence platform designed to transform long, messy transcripts into structured, actionable insights. By leveraging advanced AI models, it helps teams reclaim their time and eliminate redundant work cycles.

---

## ● The Problem

Organizations hold dozens of meetings every week, each producing transcripts that can run 20+ pages long. Critical information — decisions made, tasks assigned, reasoning behind strategies — gets buried in pages of dialogue and effectively gets lost. This forces team members into a painful "Double Work" cycle of re-discussing things that were already decided, instead of executing on them.

---

## ● The Solution

meetIQ solves this by providing a unified workspace to analyze, store, and manage meeting intelligence. Using the Google Gemini AI, it automatically extracts:

- **Executive Summaries**: Brief high-level overviews of the discussion.
- **Decision Tracking**: Explicitly captured decisions and their underlying reasoning.
- **Action Items**: Assigned tasks with deadlines and owners.
- **Issue Tracking**: Key blockers and risks identified during the session.

With meetIQ, teams have a "single source of truth" for every discussion, ensuring that no decision is forgotten and no task is left behind.

---

## ● Tech Stack

### Frontend & Core

- **TypeScript**: Typed codebase for reliability and maintainability.
- **React**: Latest React features used for UI components.
- **Vite**: Ultra-fast build tool and development server.
- **Redux Toolkit**: Centralized state management for user sessions and workspace data.

### Backend & Services

- **Firebase**:
  - **Authentication**: Secure user login/signup.
  - **Firestore**: Real-time NoSQL database for storing meeting intelligence.
- **Google Gemini API**: Advanced LLM integration for transcript processing.

### Utilities

- **Lucide React**: Beautiful, consistent iconography.
- **jsPDF & jsPDF-AutoTable**: Dynamic PDF generation for exporting meeting reports.

---

## ● Setup Instructions

### 1. Prerequisites

- [Node.js](https://nodejs.org/) installed (v18+ recommended).
- A [Google Cloud Project](https://console.cloud.google.com/) for Gemini API.
- A [Firebase Project](https://console.firebase.google.com/).

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory based on `.env.example`:

#### A. Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Create or get your **API Key**.
3. Add it to `.env`:
   ```bash
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

#### B. Firebase Project & App

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named **meetIQ**.
3. Register a **Web App** within the project.
4. Copy the `firebaseConfig` object provided.
5. Add the keys to `.env`:
   ```bash
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   VITE_MESSAGE_SENDER_ID=your_sender_id
   VITE_APP_ID=your_app_id
   ```

### 4. Running the Project

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## ● Features at a Glance

- 🚀 **AI Transcript Processing**: Upload any transcript and get instant insights.
- 📂 **Workspace Management**: Organize meetings into searchable archives.
- 📄 **Professional Exports**: Download meeting summaries as PDFs or CSVs.
- 🔒 **Secure Auth**: Private workspaces protected by Firebase Authentication.
- 🎨 **Premium UI**: Blazingly fast, responsive, and visually stunning interface.

---
