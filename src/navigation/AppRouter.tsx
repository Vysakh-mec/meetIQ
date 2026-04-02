import { Routes, Route } from "react-router-dom";
import { Login, Signup } from "@features/auth/Auth";
import { Workspace } from "@features/workspace/Workspace";
import { LandingPage } from "@features/landing/LandingPage";

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
