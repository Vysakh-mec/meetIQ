import { Routes, Route } from "react-router-dom";
import { LoginPage as Login } from "@features/auth/pages/LoginPage";
import { SignupPage as Signup } from "@features/auth/pages/SignupPage";
import { WorkspacePage as Workspace } from "@features/workspace/pages/WorkspacePage";
import { LandingPage } from "@features/landing/pages/LandingPage";

export const AppRouter = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </main>
  );
};
